
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="product-card group"
    >
      <div className="relative overflow-hidden bg-[#eeece7] aspect-[4/5]">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="product-image w-full h-full object-cover"
          />
        </Link>

        <span className="absolute top-4 left-4 bg-white px-3 py-2 text-[9px] font-bold tracking-wider">
          {product.discount}% OFF
        </span>

        <button
          onClick={() => setLiked(!liked)}
          aria-label="Add to wishlist"
          className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center transition ${
            liked ? "text-red-500" : "text-gray-800"
          }`}
        >
          <Heart size={17} fill={liked ? "currentColor" : "none"} />
        </button>

        <button
          onClick={handleAdd}
          className="absolute bottom-0 left-0 right-0 bg-[#171717] text-white py-4 text-[10px] font-bold tracking-[2px] translate-y-full group-hover:translate-y-0 transition-transform duration-300 max-md:translate-y-0"
        >
          {added ? "ADDED TO BAG ✓" : "ADD TO BAG +"}
        </button>
      </div>

      <div className="pt-4">
        <div className="flex justify-between gap-2">
          <p className="text-[10px] tracking-[2px] text-[#a18150] font-bold">
            {product.brand}
          </p>
          <p className="flex items-center gap-1 text-[10px] text-gray-500">
            <Star size={11} fill="#b89a68" stroke="#b89a68" /> {product.rating}
          </p>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold mt-2 hover:text-[#a18150] transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-sm">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-xs text-gray-400 line-through">
            ₹{product.oldPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
