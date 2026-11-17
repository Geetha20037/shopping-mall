
import { ArrowRight, CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { offers, events } from "../data/products";

export default function Offers() {
  return (
    <main>
      <section className="bg-[#e9e5dc] py-20 text-center">
        <p className="eyebrow">EXCLUSIVE MALLORA EXPERIENCES</p>
        <h1 className="section-heading mt-4">Offers worth celebrating.</h1>
        <p className="text-sm text-gray-600 mt-4">More reasons to shop. More ways to save.</p>
      </section>

      <section className="container-main section-padding">
        <div className="mb-10">
          <p className="eyebrow">DON'T MISS OUT</p>
          <h2 className="section-heading mt-3">Special offers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {offers.map((offer) => (
            <article key={offer.title} className="relative min-h-[340px] overflow-hidden group">
              <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative p-8 md:p-10 text-white flex flex-col justify-end min-h-[340px]">
                <p className="text-[#e3c99e] text-[10px] tracking-[3px] font-bold">{offer.discount}</p>
                <h3 className="font-display text-3xl md:text-4xl mt-3">{offer.title}</h3>
                <p className="text-sm text-gray-200 mt-3 max-w-[400px]">{offer.description}</p>
                <div className="flex flex-wrap gap-4 items-center mt-7">
                  <Link to="/shop" className="bg-white text-black px-5 py-3 text-[10px] font-bold tracking-widest hover:bg-[#b89a68] hover:text-white transition">
                    SHOP NOW <ArrowRight className="inline ml-2" size={14} />
                  </Link>
                  <span className="text-xs border border-white/50 px-4 py-3">CODE: {offer.code}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="mb-12">
            <p className="eyebrow">WHAT'S HAPPENING AT MALLORA</p>
            <h2 className="section-heading mt-3">Upcoming events</h2>
          </div>

          <div className="space-y-5">
            {events.map((event) => (
              <article key={event.title} className="border border-black/10 p-7 md:p-9 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-7 hover:border-[#b89a68] transition">
                <div>
                  <span className="text-[10px] tracking-widest text-[#a18150] font-bold">{event.category.toUpperCase()}</span>
                  <h3 className="font-display text-3xl mt-3">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-3 max-w-[650px]">{event.description}</p>
                  <div className="flex flex-wrap gap-5 mt-6 text-xs text-gray-600">
                    <span className="flex items-center gap-2"><CalendarDays size={15} /> {event.date}</span>
                    <span className="flex items-center gap-2"><Clock size={15} /> {event.time}</span>
                    <span className="flex items-center gap-2"><MapPin size={15} /> {event.location}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <a href="/contact" className="btn-outline whitespace-nowrap">ENQUIRE NOW <ArrowRight size={14} className="ml-2" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}