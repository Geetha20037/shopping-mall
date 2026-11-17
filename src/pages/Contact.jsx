
import { useState } from "react";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Enquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "General Enquiry", message: "" });
  };

  return (
    <main>
      <section className="bg-[#e9e5dc] text-center py-20">
        <p className="eyebrow">WE'D LOVE TO HEAR FROM YOU</p>
        <h1 className="section-heading mt-4">Let's get in touch.</h1>
        <p className="text-sm text-gray-600 mt-4">Questions, feedback or just saying hello? We're here for you.</p>
      </section>

      <section className="container-main section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-14">
          <div>
            <p className="eyebrow">CONTACT INFORMATION</p>
            <h2 className="font-display text-4xl mt-4">We're always happy to help.</h2>
            <p className="text-sm text-gray-500 leading-7 mt-5">Reach out to our team for information about stores, shopping experiences, events and more.</p>

            <div className="space-y-8 mt-12">
              <div className="flex gap-5">
                <MapPin className="text-[#b89a68]" size={23} />
                <div>
                  <h3 className="font-bold text-sm">Our location</h3>
                  <p className="text-sm text-gray-500 mt-2">Mallora Shopping Center<br />Bengaluru, Karnataka, India</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Phone className="text-[#b89a68]" size={23} />
                <div>
                  <h3 className="font-bold text-sm">Call us</h3>
                  <p className="text-sm text-gray-500 mt-2">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Mail className="text-[#b89a68]" size={23} />
                <div>
                  <h3 className="font-bold text-sm">Email us</h3>
                  <p className="text-sm text-gray-500 mt-2">hello@mallora.com</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock className="text-[#b89a68]" size={23} />
                <div>
                  <h3 className="font-bold text-sm">Opening hours</h3>
                  <p className="text-sm text-gray-500 mt-2">Monday – Sunday<br />10:00 AM – 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 md:p-10">
            <h2 className="font-display text-3xl">Send us a message.</h2>
            <p className="text-xs text-gray-500 mt-3 mb-8">Fill in the form and our team will be happy to assist.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-3">Your name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full bg-transparent border-b border-black/20 py-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-3">Email address</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="w-full bg-transparent border-b border-black/20 py-3 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-3">Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full bg-transparent border-b border-black/20 py-3 text-sm">
                  <option>General Enquiry</option>
                  <option>Store Information</option>
                  <option>Offers and Events</option>
                  <option>Customer Support</option>
                  <option>Business Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-3">Your message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help you?" className="w-full resize-none bg-transparent border-b border-black/20 py-3 text-sm" />
              </div>

              {submitted && <p className="text-green-700 text-xs">Your message has been submitted successfully! (Demo form)</p>}

              <button type="submit" className="btn-primary">SEND MESSAGE <ArrowRight size={15} /></button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}