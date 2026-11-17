
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search, ShoppingBag, Menu, X, UserRound, ChevronDown
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Stores", path: "/stores" },
    { name: "Offers", path: "/offers" },
    { name: "Contact", path: "/contact" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearchOpen(false);
      setSearch("");
      setMenuOpen(false);
    }
  };

  return (
    <>
      <div className="bg-[#171717] text-white text-center py-2 text-[10px] tracking-[2px]">
        EXCLUSIVE SEASON SALE — DISCOVER UP TO 60% OFF
      </div>

      <header className="sticky top-0 z-50 bg-[#f8f7f4]/95 backdrop-blur-xl border-b border-black/5">
        <div className="container-main h-[76px] flex items-center justify-between gap-4">

          <Link to="/" className="text-[27px] font-bold tracking-[4px]">
            MALLORA<span className="text-[#b89a68]">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-[11px] font-bold tracking-[1px] transition ${
                    isActive ? "text-[#b89a68]" : "text-gray-600 hover:text-black"
                  }`
                }
              >
                {link.name.toUpperCase()}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="hover:text-[#b89a68]"
            >
              <Search size={20} strokeWidth={1.6} />
            </button>

            <Link to="/login" className="hidden md:block hover:text-[#b89a68]" aria-label="Account">
              <UserRound size={20} strokeWidth={1.6} />
            </Link>

            <Link to="/cart" className="relative hover:text-[#b89a68]" aria-label="Shopping cart">
              <ShoppingBag size={21} strokeWidth={1.6} />
              <span className="absolute -top-2 -right-3 bg-[#b89a68] text-white w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center">
                {totalItems}
              </span>
            </Link>

            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="container-main pb-5">
            <div className="flex border-b border-black/30 py-2">
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands and categories..."
                className="w-full bg-transparent text-sm"
              />
              <button type="submit"><Search size={20} /></button>
            </div>
          </form>
        )}

        {menuOpen && (
          <div className="lg:hidden bg-[#f8f7f4] border-t border-black/5 p-6 space-y-5">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold tracking-wider"
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold">
              SIGN IN / SIGN UP
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
