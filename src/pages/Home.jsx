
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { products, categories, stores } from "../data/products";
import ProductGrid from "../components/ProductGrid";

const slides = [
  {
    eyebrow: "THE ART OF EVERYDAY STYLE",
    title: "Discover a world of extraordinary.",
    text: "Explore the collections you love. Experience shopping in a whole new way.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800",
    button: "EXPLORE COLLECTION",
    link: "/shop"
  },
  {
    eyebrow: "YOUR NEXT FAVORITE LOOK",
    title: "Style that speaks for you.",
    text: "Find timeless pieces, new trends and everything in between.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800",
    button: "SHOP FASHION",
    link: "/shop?category=Fashion"
  },
  {
    eyebrow: "THE BIGGEST SEASONAL EVENT",
    title: "More shopping. More savings.",
    text: "Enjoy exclusive deals and special experiences across your favorite stores.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1800",
    button: "VIEW OFFERS",
    link: "/offers"
  }
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const changeSlide = (direction) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <main>
      <section className="relative h-[620px] md:h-[680px] overflow-hidden bg-[#ddd]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={slides[active].image}
              alt="Mallora shopping collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="container-main relative z-10 h-full flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="text-white max-w-[650px]"
            >
              <p className="text-[#e0c39a] text-[10px] md:text-xs font-bold tracking-[4px] mb-7">
                {slides[active].eyebrow}
              </p>

              <h1 className="font-display text-[45px] md:text-[76px] leading-[1.08]">
                {slides[active].title}
              </h1>

              <p className="text-gray-200 text-sm md:text-base leading-7 max-w-[460px] mt-6">
                {slides[active].text}
              </p>

              <Link to={slides[active].link} className="inline-flex items-center gap-4 bg-white text-black px-7 py-4 mt-9 text-[10px] font-bold tracking-[2px] hover:bg-[#b89a68] hover:text-white transition">
                {slides[active].button} <ArrowRight size={17} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-10 right-[4%] z-20 flex items-center gap-4 text-white">
          <span className="text-xs tracking-widest">0{active + 1} / 0{slides.length}</span>
          <button onClick={() => changeSlide(-1)} aria-label="Previous slide" className="border border-white/50 p-3 hover:bg-white hover:text-black transition">
            <ChevronLeft size={17} />
          </button>
          <button onClick={() => changeSlide(1)} aria-label="Next slide" className="border border-white/50 p-3 hover:bg-white hover:text-black transition">
            <ChevronRight size={17} />
          </button>
        </div>
      </section>

      <section className="bg-white py-7 border-b border-black/5">
        <div className="container-main grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["01", "Premium Brands"],
            ["02", "Exclusive Offers"],
            ["03", "Easy Shopping"],
            ["04", "Amazing Experiences"]
          ].map(([number, title]) => (
            <div key={number}>
              <p className="text-[#b89a68] text-xs font-bold">{number}</p>
              <p className="text-[11px] font-bold tracking-wider mt-2">{title.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding container-main">
        <div className="text-center mb-12">
          <p className="eyebrow">EXPLORE THE MALL</p>
          <h2 className="section-heading mt-3">Shop by category</h2>
          <p className="text-sm text-gray-500 mt-4">Everything you love, all in one destination.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              key={category.name}
              className="group"
            >
              <div className="overflow-hidden bg-[#eeece7] aspect-[4/5]">
                <img src={category.image} alt={category.name} className="product-image w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-sm font-bold mt-4 group-hover:text-[#a18150]">{category.name}</h3>
              <p className="text-[10px] text-gray-500 mt-1">{category.count}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="flex justify-between items-end mb-10 gap-4">
            <div>
              <p className="eyebrow">HANDPICKED FOR YOU</p>
              <h2 className="section-heading mt-3">Trending collections</h2>
              <p className="text-sm text-gray-500 mt-3">Discover pieces that make every moment special.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs font-bold border-b border-black pb-2">
              VIEW ALL PRODUCTS <ArrowUpRight size={16} />
            </Link>
          </div>
          <ProductGrid products={products.slice(0, 8)} />
          <div className="text-center mt-10 md:hidden">
            <Link to="/shop" className="btn-outline">VIEW ALL PRODUCTS</Link>
          </div>
        </div>
      </section>

      <section className="section-padding container-main">
        <div className="relative overflow-hidden min-h-[370px] bg-[#d8d0c3]">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1500"
            alt="Seasonal fashion promotion"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 text-white p-9 md:p-16 max-w-[620px]">
            <p className="text-[#e4c99e] text-[10px] font-bold tracking-[4px]">LIMITED TIME OFFER</p>
            <h2 className="font-display text-5xl md:text-7xl mt-5">The season of savings.</h2>
            <p className="text-sm mt-5 text-gray-200">Discover exclusive deals across fashion, beauty, electronics and more.</p>
            <Link to="/offers" className="inline-flex items-center gap-3 bg-white text-black px-7 py-4 mt-8 text-[10px] font-bold tracking-[2px] hover:bg-[#b89a68] hover:text-white transition">
              EXPLORE OFFERS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="eyebrow">DISCOVER YOUR FAVORITES</p>
            <h2 className="section-heading mt-3">Explore popular stores</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stores.slice(0, 4).map((store) => (
              <Link to="/stores" key={store.name} className="group relative overflow-hidden aspect-[5/4]">
                <img src={store.image} alt={store.name} className="product-image w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="font-display text-2xl">{store.name}</h3>
                  <p className="text-[10px] tracking-widest mt-1">{store.category.toUpperCase()}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/stores" className="btn-outline">EXPLORE ALL STORES</Link>
          </div>
        </div>
      </section>

      <section className="section-padding container-main">
        <div className="bg-[#e9e5dc] p-8 md:p-16 text-center">
          <Sparkles className="mx-auto text-[#a18150]" size={25} />
          <p className="eyebrow mt-5">STAY IN THE KNOW</p>
          <h2 className="section-heading mt-3">A little more Mallora in your inbox.</h2>
          <p className="text-sm text-gray-600 mt-4">Get updates on new collections, special offers and exciting events.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSubscribed(true);
            }}
            className="flex flex-col sm:flex-row max-w-[480px] mx-auto mt-8 gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 text-sm bg-white"
            />
            <button className="btn-primary">SUBSCRIBE <ArrowRight size={15} /></button>
          </form>
          {subscribed && <p className="text-green-700 text-xs mt-4">Thank you for subscribing!</p>}
        </div>
      </section>
    </main>
  );
}