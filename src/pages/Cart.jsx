
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Cart() {
  const { cart, subtotal, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!cart.length) return;
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <main className="min-h-[65vh] flex flex-col items-center justify-center text-center px-5">
        <div className="bg-[#e9e5dc] rounded-full p-6">
          <ShoppingBag size={35} />
        </div>
        <h1 className="font-display text-4xl mt-7">Thank you for shopping!</h1>
        <p className="text-sm text-gray-500 mt-4">Your demo order has been placed successfully.</p>
        <Link to="/shop" className="btn-primary mt-8">CONTINUE SHOPPING</Link>
      </main>
    );
  }

  return (
    <main className="container-main py-14 md:py-20 min-h-screen">
      <div className="mb-12">
        <p className="eyebrow">YOUR SHOPPING BAG</p>
        <h1 className="section-heading mt-3">Shopping cart.</h1>
        <p className="text-sm text-gray-500 mt-3">{totalItems} items in your bag</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white">
          <ShoppingBag size={45} className="mx-auto text-gray-400" />
          <h2 className="font-display text-3xl mt-6">Your bag is waiting.</h2>
          <p className="text-sm text-gray-500 mt-3">Discover something wonderful to add to your collection.</p>
          <Link to="/shop" className="btn-primary mt-8">START SHOPPING <ArrowRight size={15} /></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          <div>
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_40px] gap-5 pb-5 border-b border-black/10 text-[10px] font-bold tracking-widest">
              <span>PRODUCT</span><span>PRICE</span><span>QUANTITY</span><span></span>
            </div>

            <div className="divide-y divide-black/10">
              {cart.map((item) => (
                <article key={item.id} className="py-7 grid grid-cols-[95px_1fr] md:grid-cols-[2fr_1fr_1fr_40px] gap-5 items-center">
                  <div className="w-[95px] h-[115px] bg-[#eeece7]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <p className="text-[10px] text-[#a18150] font-bold tracking-widest">{item.brand}</p>
                    <h3 className="text-sm font-bold mt-2">{item.name}</h3>
                    <p className="text-sm mt-2 md:hidden">₹{item.price.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-gray-500 mt-2">{item.category}</p>
                  </div>

                  <p className="hidden md:block text-sm font-semibold">₹{item.price.toLocaleString("en-IN")}</p>

                  <div className="flex items-center border border-black/15 w-fit">
                    <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><Minus size={12} /></button>
                    <span className="text-xs px-2">{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><Plus size={12} /></button>
                  </div>

                  <button aria-label="Remove product" onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>

            <button onClick={clearCart} className="text-xs text-gray-500 hover:text-red-500 mt-5">
              CLEAR CART
            </button>
          </div>

          <aside className="bg-white p-7 h-fit">
            <h2 className="font-display text-2xl mb-7">Order summary</h2>
            <div className="flex justify-between text-sm mb-5">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <span className="text-gray-500">Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <p className="text-[11px] text-gray-400 mb-5">Free shipping on orders above ₹3,000.</p>
            <div className="border-t border-black/10 pt-5 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full mt-8">
              CHECKOUT <ArrowRight size={16} />
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-5">Demo checkout – no real payment is processed.</p>
          </aside>
        </div>
      )}
    </main>
  );
}