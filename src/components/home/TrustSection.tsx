"use client";

import { Truck, ShieldCheck, Clock, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Truck size={32} />,
    title: "UK Wide Delivery",
    desc: "Fast & Secure shipping to your doorstep",
    color: "text-accent",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "100% Authentic",
    desc: "Direct from Kerala to your kitchen",
    color: "text-success",
  },
  {
    icon: <Clock size={32} />,
    title: "Fresh Daily Stock",
    desc: "Hand-picked fresh vegetables & fruit",
    color: "text-primary",
  },
  {
    icon: <Headphones size={32} />,
    title: "Dedicated Support",
    desc: "WhatsApp & Tel support across UK",
    color: "text-primary",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

export default function TrustSection() {
  return (
    <section className="py-24 bg-surface border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5 }}
              className="glass-card !bg-white/50 p-8 rounded-4xl flex flex-col items-center text-center space-y-4 group transition-all duration-300 hover:shadow-glow hover:border-primary/10"
            >
              <div
                className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform ${f.color}`}
              >
                {f.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-heading font-black text-slate-900">
                  {f.title}
                </h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
