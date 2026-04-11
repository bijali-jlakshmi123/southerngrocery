"use client";

import { MapPin, Phone, Clock, Navigation, Store } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const stores = [
  {
    label: "Burton upon Trent — Main Store",
    badge: "MAIN BRANCH",
    badgeColor: "bg-primary text-white",
    address: "2 Goodman St, Burton-on-Trent, DE14 2RB",
    phone: "+44 7352 393384",
    hours: [
      { day: "Monday", time: "10:00 – 19:00" },
      { day: "Tuesday", time: "Closed" },
      { day: "Wednesday", time: "10:00 – 19:00" },
      { day: "Thursday", time: "10:00 – 19:00" },
      { day: "Friday", time: "10:00 – 19:00" },
      { day: "Saturday", time: "10:00 – 19:00" },
      { day: "Sunday", time: "10:00 – 16:00" },
    ],
    mapsLink: "https://share.google/c3GT9j5U8iqBEcFiT",
    mapQuery: "2+Goodman+St,Burton-on-Trent,DE14+2RB",
    description: "Our flagship Kerala grocery store in the heart of Burton upon Trent — stocking the widest range of authentic South Indian and Kerala products.",
  },
  {
    label: "Derby Store",
    badge: "DERBY",
    badgeColor: "bg-secondary text-white",
    address: "Browning Circle, Sunny Hill, Derby, DE23 8AR",
    phone: "+44 7352 393384",
    hours: [
      { day: "Monday", time: "10:00 – 19:00" },
      { day: "Tuesday", time: "10:00 – 19:00" },
      { day: "Wednesday", time: "10:00 – 19:00" },
      { day: "Thursday", time: "10:00 – 19:00" },
      { day: "Friday", time: "10:00 – 19:00" },
      { day: "Saturday", time: "10:00 – 19:00" },
      { day: "Sunday", time: "10:00 – 16:00" },
    ],
    mapsLink: "https://share.google/T0wCOajtqaqvWt9cb",
    mapQuery: "Browning+Circle,Derby,DE23+8AR",
    description: "Serving the Derby community with fresh Kerala produce, spices, oils, and daily essentials from South India.",
  },
  {
    label: "Nottingham Store",
    badge: "NOTTINGHAM",
    badgeColor: "bg-slate-800 text-white",
    address: "553–555 Valley Road, Nottingham, NG5 1JE",
    phone: "+44 7352 393384",
    hours: [
      { day: "Monday", time: "10:00 – 19:00" },
      { day: "Tuesday", time: "10:00 – 19:00" },
      { day: "Wednesday", time: "10:00 – 19:00" },
      { day: "Thursday", time: "10:00 – 19:00" },
      { day: "Friday", time: "10:00 – 19:00" },
      { day: "Saturday", time: "10:00 – 19:00" },
      { day: "Sunday", time: "10:00 – 16:00" },
    ],
    mapsLink: "https://share.google/MXa6B5WWZVKuLX3qV",
    mapQuery: "553+Valley+Road,Nottingham,NG5+1JE",
    description: "Your local Kerala convenience store in Nottingham — fresh vegetables, rice, spices, snacks and more available daily.",
  },
];

export default function StoreAddressPage() {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="section-container">

        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/5 text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <Store size={14} /> Store Locations
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-heading font-black text-slate-900 tracking-tight leading-tight mb-6">
            Visit Us <span className="text-primary">In Store</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            We have three stores across the Midlands stocked with authentic Kerala
            groceries, fresh vegetables, spices, and much more.
          </p>
        </div>

        {/* Store Cards */}
        <div className="space-y-16">
          {stores.map((store, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-5xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-premium transition-all"
            >
              <div className="grid lg:grid-cols-2">
                {/* Map */}
                <div className="relative h-72 lg:h-auto min-h-[280px] bg-slate-100">
                  <iframe
                    src={`https://maps.google.com/maps?q=${store.mapQuery}&output=embed&z=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "280px" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full absolute inset-0"
                  />
                </div>

                {/* Info */}
                <div className="p-10 lg:p-14 flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <span className={`inline-block text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${store.badgeColor}`}>
                      {store.badge}
                    </span>
                    <h2 className="text-2xl font-heading font-black text-slate-900 leading-snug">
                      {store.label}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {store.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-semibold text-slate-700">{store.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="text-primary flex-shrink-0" />
                        <a
                          href={`tel:${store.phone.replace(/\s/g, "")}`}
                          className="font-semibold text-slate-700 hover:text-primary transition-colors"
                        >
                          {store.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-300 uppercase tracking-widest">
                      <Clock size={14} />
                      Opening Hours
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                      {store.hours.map((h) => (
                        <div key={h.day} className="flex justify-between text-sm">
                          <span className="text-slate-400 font-medium">{h.day}</span>
                          <span className={`font-bold ${h.time === "Closed" ? "text-red-400" : "text-slate-700"}`}>
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={store.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-primary text-white font-black px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all hover:shadow-lg w-fit text-sm"
                  >
                    <Navigation size={16} />
                    Get Directions on Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 bg-slate-900 rounded-5xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
              Can&apos;t Make It In Store?
            </h2>
            <p className="text-slate-400 text-lg font-medium mb-8 max-w-xl mx-auto">
              Order online and get authentic Kerala groceries delivered straight to your door anywhere in the UK.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/category/rice"
                className="bg-primary text-white font-black px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all hover:shadow-glow"
              >
                Shop Online
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 text-white font-black px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
