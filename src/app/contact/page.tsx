"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Store,
  Navigation,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

const stores = [
  {
    label: "Main Store — Burton upon Trent",
    badge: "MAIN BRANCH",
    badgeColor: "bg-primary text-white",
    address: "2 Goodman St, Burton-on-Trent, DE14 2RB",
    phone: "+44 7352 393384",
    hours: "Mon & Wed–Sat 10:00–19:00 · Sun 10:00–16:00 · Tue Closed",
    mapsLink: "https://share.google/c3GT9j5U8iqBEcFiT",
    mapQuery: "2+Goodman+St,Burton-on-Trent,DE14+2RB",
  },
  {
    label: "Derby Store",
    badge: "DERBY",
    badgeColor: "bg-secondary text-white",
    address: "Browning Circle, Sunny Hill, Derby, DE23 8AR",
    phone: "+44 7352 393384",
    hours: "Mon–Sat 10:00–19:00 · Sun 10:00–16:00",
    mapsLink: "https://share.google/T0wCOajtqaqvWt9cb",
    mapQuery: "Browning+Circle,Derby,DE23+8AR",
  },
  {
    label: "Nottingham Store",
    badge: "NOTTINGHAM",
    badgeColor: "bg-slate-800 text-white",
    address: "553–555 Valley Road, Nottingham, NG5 1JE",
    phone: "+44 7352 393384",
    hours: "Mon–Sat 10:00–19:00 · Sun 10:00–16:00",
    mapsLink: "https://share.google/MXa6B5WWZVKuLX3qV",
    mapQuery: "553+Valley+Road,Nottingham,NG5+1JE",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "📨 Thank you! Your message has been sent. We will get back to you shortly.",
      { position: "bottom-right", theme: "colored" }
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      value: "+44 7352 393384",
      subtitle: "Mon–Sat, 10AM–7PM",
      link: "tel:+447352393384",
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      value: "support@southernspices.co.uk",
      subtitle: "Reply within 24h",
      link: "mailto:support@southernspices.co.uk",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "WhatsApp",
      value: "Chat Now",
      subtitle: "Instant Support",
      link: "https://wa.me/+447352393384",
    },
    {
      icon: <Store size={24} />,
      title: "Our Stores",
      value: "3 Locations",
      subtitle: "Burton · Derby · Nottingham",
      link: "#our-stores",
    },
  ];

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/5 text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <MessageSquare size={14} /> Get in Touch
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
            We&apos;re Here for{" "}
            <span className="text-secondary italic">Your Spices</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Have a question about a product or need help with your order? Our
            team of Kerala grocery experts is ready to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-4xl border border-slate-50 shadow-sm hover:shadow-premium transition-all group flex items-start gap-6"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6 flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                      {info.title}
                    </div>
                    <a
                      href={info.link}
                      target={info.link?.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-lg font-heading font-black text-slate-900 hover:text-primary transition-colors truncate block"
                    >
                      {info.value}
                    </a>
                    <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter opacity-60">
                      {info.subtitle}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div className="bg-slate-900 rounded-5xl p-10 text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-3xl" />
              <h3 className="text-2xl font-heading font-black relative z-10">
                Follow Our Spice Journey
              </h3>
              <div className="flex gap-4 relative z-10">
                {[Instagram, Facebook, Twitter].map((Social, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
                  >
                    <Social size={20} />
                  </button>
                ))}
              </div>
              <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Join 15k+ followers
                </span>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-5xl border border-slate-50 shadow-premium relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-4">
                    Full Name
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    type="text"
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-4">
                    Email Address
                  </label>
                  <input
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="username@example.com"
                    type="email"
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-4">
                  Message Subject
                </label>
                <input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Bulk Order Query"
                  type="text"
                  className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-4">
                  Tell Us More
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-8 py-6 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300 resize-none"
                />
              </div>

              <button className="btn-base btn-primary !py-5 w-full shadow-glow group overflow-hidden relative">
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg font-black tracking-widest text-white">
                  Send Message{" "}
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          </div>
        </div>

        {/* Store Locations */}
        <div id="our-stores" className="mt-32 pt-24 border-t border-slate-100">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/5 text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            >
              <MapPin size={14} /> Our Stores
            </motion.div>
            <h2 className="text-4xl font-heading font-black text-slate-900 mb-4">
              Find Us <span className="text-primary">Near You</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">
              Visit any of our three stores across the Midlands for authentic Kerala and Indian groceries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stores.map((store, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-premium transition-all"
              >
                {/* Embedded Google Map */}
                <div className="relative h-52 w-full bg-slate-100">
                  <iframe
                    src={`https://maps.google.com/maps?q=${store.mapQuery}&output=embed&z=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="p-8 space-y-4">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${store.badgeColor}`}>
                    {store.badge}
                  </span>
                  <h3 className="text-lg font-heading font-black text-slate-900 leading-snug mt-3">
                    {store.label}
                  </h3>
                  <div className="space-y-2 text-sm text-slate-500">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-primary flex-shrink-0" />
                      <a
                        href={`tel:${store.phone.replace(/\s/g, "")}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-medium leading-snug">{store.hours}</span>
                    </div>
                  </div>
                  <a
                    href={store.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-black text-sm mt-2 hover:underline"
                  >
                    <Navigation size={14} />
                    Get Directions
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-32 pt-24 border-t border-slate-100">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-black text-slate-900 mb-4">
              Quick <span className="text-primary">Answers</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              Commonly asked questions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { q: "Where do you deliver?", a: "We deliver across the entire UK, including London, Manchester, Birmingham, and Edinburgh." },
              { q: "How long does shipping take?", a: "Most orders are dispatched within 24 hours. Standard delivery typically takes 3–5 business days." },
              { q: "Are your vegetables fresh?", a: "Yes! Our vegetables are sourced daily to ensure you receive only the freshest authentic Kerala produce." },
              { q: "Do you offer bulk discounts?", a: "We certainly do! Please contact us using the form above for bulk order quotes." },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 p-8 rounded-4xl border border-transparent hover:border-slate-100 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-secondary group-hover:scale-110 transition-transform">
                    <ChevronRight size={20} />
                  </div>
                  <h4 className="text-lg font-heading font-black text-slate-900">{faq.q}</h4>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
