
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductGrid from "../components/ProductGrid";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6">BACK TO SHOP</Link>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const related = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  return (
    <main className="container-main py-10 md:py-16">
      <Link to="/shop" className="flex items-center gap-2 text-xs text-gray-500 mb-9">
        <ArrowLeft size={15} /> BACK TO SHOP
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="bg-[#eeece7]">
          <img src={product.image} alt={product.name} className="w-full aspect-[4/5] object-cover" />
        </div>

        <div className="py-4 md:py-10">
          <p className="eyebrow">{product.brand} / {product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-4">{product.name}</h1>

          <div className="flex items-center gap-2 mt-5">
            <div className="flex text-[#b89a68]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-xs text-gray-500">{product.rating} / 5.0</span>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <span className="text-2xl font-bold">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="text-gray-400 line-through">₹{product.oldPrice.toLocaleString("en-IN")}</span>
            <span className="text-xs font-bold text-green-700">{product.discount}% OFF</span>
          </div>

          <p className="text-sm leading-8 text-gray-500 mt-8">{product.description}</p>

          <div className="flex items-center gap-4 mt-9">
            <span className="text-xs font-bold tracking-widest">QUANTITY</span>
            <div className="flex items-center border border-black/20">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3"><Minus size={14} /></button>
              <span className="px-4 text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3"><Plus size={14} /></button>
            </div>
          </div>

          <div className="flex gap-3 mt-9">
            <button onClick={handleAdd} className="btn-primary flex-1">
              {added ? <><Check size={17} /> ADDED TO CART</> : <><ShoppingBag size={17} /> ADD TO CART</>}
            </button>
            <button onClick={() => setLiked(!liked)} aria-label="Add to wishlist" className="border border-black/20 p-4">
              <Heart size={19} fill={liked ? "currentColor" : "none"} className={liked ? "text-red-500" : ""} />
            </button>
          </div>

          <div className="border-t border-black/10 mt-10 pt-7 space-y-4 text-xs text-gray-500">
            <p className="flex items-center gap-3"><Check size={15} /> Premium quality selection</p>
            <p className="flex items-center gap-3"><Check size={15} /> Secure shopping experience</p>
            <p className="flex items-center gap-3"><Check size={15} /> Easy shopping and support</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section-padding">
          <p className="eyebrow">YOU MAY ALSO LIKE</p>
          <h2 className="section-heading mt-3 mb-9">Complete your collection.</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </main>
  );
}