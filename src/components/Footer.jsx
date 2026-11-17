
import { Link } from "react-router-dom";
import {
  Instagram, Facebook, Twitter, ArrowUpRight,
  MapPin, Phone, Mail
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-white pt-16 pb-7">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">

          <div>
            <Link to="/" className="text-3xl tracking-[4px] font-bold">
              MALLORA<span className="text-[#b89a68]">.</span>
            </Link>
            <p className="text-gray-400 text-sm leading-7 mt-5 max-w-[270px]">
              A destination where shopping meets discovery. Explore the best brands, exclusive offers and unforgettable experiences.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label={["Instagram", "Facebook", "Twitter"][i]} className="text-gray-400 hover:text-[#b89a68]">
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[2px] mb-6">QUICK LINKS</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <Link className="block hover:text-white" to="/shop">Shop All</Link>
              <Link className="block hover:text-white" to="/stores">Store Directory</Link>
              <Link className="block hover:text-white" to="/offers">Offers & Events</Link>
              <Link className="block hover:text-white" to="/contact">Contact Us</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[2px] mb-6">CUSTOMER CARE</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <p>Shopping Guide</p>
              <p>Shipping Information</p>
              <p>Returns & Refunds</p>
              <p>Privacy Policy</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[2px] mb-6">GET IN TOUCH</h3>
            <div className="space-y-5 text-sm text-gray-400">
              <p className="flex gap-3"><MapPin size={17} /> Mallora Shopping Center, Bengaluru</p>
              <p className="flex gap-3"><Phone size={17} /> +91 98765 43210</p>
              <p className="flex gap-3"><Mail size={17} /> hello@mallora.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-[11px] text-gray-500">
          <p>© 2026 MALLORA. ALL RIGHTS RESERVED.</p>
          <p>MADE FOR THE LOVE OF SHOPPING.</p>
        </div>
      </div>
    </footer>
  );
}