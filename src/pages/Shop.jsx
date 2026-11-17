
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "../data/products";
import ProductGrid from "../components/ProductGrid";

export default function Shop() {
  const [params, setParams] = useSearchParams();

  const [category, setCategory] = useState(params.get("category") || "All");
  const [search, setSearch] = useState(params.get("search") || "");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(15000);

  useEffect(() => {
    setCategory(params.get("category") || "All");
    setSearch(params.get("search") || "");
  }, [params]);

  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      const matchCategory = category === "All" || product.category === category;
      const matchSearch = `${product.name} ${product.brand} ${product.category}`
        .toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch && product.price <= maxPrice;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "discount") result.sort((a, b) => b.discount - a.discount);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [category, search, sort, maxPrice]);

  return (
    <main className="container-main py-12 md:py-16 min-h-screen">
      <div className="text-center mb-12">
        <p className="eyebrow">THE MALLORA COLLECTION</p>
        <h1 className="section-heading mt-3">Discover your style.</h1>
        <p className="text-sm text-gray-500 mt-3">Explore all your favorite products in one place.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        <aside>
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal size={18} />
            <h2 className="text-sm font-bold tracking-widest">FILTER PRODUCTS</h2>
          </div>

          <div className="border-b border-black/10 pb-7">
            <h3 className="text-xs font-bold tracking-widest mb-5">CATEGORIES</h3>
            <div className="space-y-4">
              {["All", ...categories.map((c) => c.name)].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setParams((previous) => {
                      const next = new URLSearchParams(previous);
                      if (item === "All") next.delete("category");
                      else next.set("category", item);
                      return next;
                    });
                  }}
                  className={`block w-full text-left text-sm transition ${
                    category === item ? "text-[#a18150] font-bold" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-7">
            <h3 className="text-xs font-bold tracking-widest mb-5">MAXIMUM PRICE</h3>
            <input
              type="range"
              min="500"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#b89a68]"
            />
            <p className="text-sm text-gray-600 mt-3">Up to ₹{maxPrice.toLocaleString("en-IN")}</p>
          </div>
        </aside>

        <section>
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
            <div className="flex border-b border-black/30 items-center gap-3 pb-3 flex-1 max-w-[400px]">
              <Search size={18} className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent w-full text-sm"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-black/20 px-4 py-3 text-xs"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="flex justify-between items-center mb-7">
            <p className="text-xs text-gray-500">{filtered.length} PRODUCTS FOUND</p>
            <p className="text-[10px] tracking-widest text-[#a18150] font-bold">{category.toUpperCase()}</p>
          </div>

          <ProductGrid products={filtered} />
        </section>
      </div>
    </main>
  );
}