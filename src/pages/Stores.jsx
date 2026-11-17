
import { useMemo, useState } from "react";
import { Search, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { stores } from "../data/products";

export default function Stores() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => stores.filter((store) => {
    const matchName = `${store.name} ${store.category}`.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || store.category === category;
    return matchName && matchCategory;
  }), [search, category]);

  return (
    <main className="container-main py-14 md:py-20 min-h-screen">
      <div className="text-center mb-12">
        <p className="eyebrow">THE MALL DIRECTORY</p>
        <h1 className="section-heading mt-3">Find your favorite stores.</h1>
        <p className="text-sm text-gray-500 mt-4">Discover brands, explore collections and find everything you need.</p>
      </div>

      <div className="bg-white p-5 md:p-8 mb-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex items-center gap-3 border-b border-black/20 pb-3">
          <Search size={19} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stores and brands..."
            className="bg-transparent w-full text-sm"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-transparent border border-black/20 p-3 text-sm"
        >
          {["All", "Fashion", "Electronics", "Footwear", "Beauty", "Groceries", "Accessories"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <p className="text-xs text-gray-500 mb-7">{filtered.length} STORES AVAILABLE</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {filtered.map((store) => (
          <article key={store.name} className="bg-white group">
            <div className="overflow-hidden aspect-[16/10]">
              <img src={store.image} alt={store.name} className="product-image w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="eyebrow">{store.category}</p>
                  <h2 className="font-display text-3xl mt-2">{store.name}</h2>
                </div>
                <ArrowUpRight size={20} className="text-[#b89a68]" />
              </div>
              <p className="text-sm text-gray-500 mt-4">{store.description}</p>
              <p className="text-xs flex items-center gap-2 mt-5 text-gray-600">
                <MapPin size={14} /> {store.floor}
              </p>
              <Link to={`/shop?category=${encodeURIComponent(store.category)}`} className="inline-block mt-6 text-[10px] font-bold tracking-[2px] border-b border-black pb-2">
                EXPLORE PRODUCTS
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center py-20 text-gray-500">No stores found. Try another search.</p>}
    </main>
  );
}