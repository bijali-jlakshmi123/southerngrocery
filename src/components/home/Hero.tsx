"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  ChevronRight,
  Truck,
  Tag,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-slate-50 py-12 lg:py-16 px-6">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-10 skew-x-[-12deg] translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-16 w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm text-primary font-black text-xs uppercase tracking-widest"
            >
              <Sparkles size={16} /> UK's #1 Kerala Store
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-slate-900 leading-[1.1]">
              Kerala & Indian <br />
              <span className="text-primary italic">Groceries</span> <br />
              Delivered Across <span className="text-secondary underline decoration-primary/20 underline-offset-8">UK</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-xl font-medium leading-relaxed">
              Bringing the authentic taste of home to your UK doorstep. Fresh stock, traditional brands, and lightning-fast delivery.
            </p>
          </div>

          {/* Exact Offers Requested */}
          <div className="space-y-3">
             <div className="flex items-center gap-3 text-lg font-heading font-black text-slate-800">
                <span className="w-9 h-9 bg-success/10 rounded-xl flex items-center justify-center text-success"><CheckCircle size={18} /></span>
                👉 Free delivery above £50
             </div>
             <div className="flex items-center gap-3 text-lg font-heading font-black text-slate-800">
                <span className="w-9 h-9 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary"><Tag size={18} /></span>
                👉 Weekly offers
             </div>
          </div>

          {/* Exact CTAs Requested */}
          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <Link
              href="/category/rice"
              className="btn-base btn-primary !py-4 !px-8 text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                ✅ Shop Rice <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
            <Link
              href="/category/snacks"
              className="btn-base btn-outline !py-4 !px-8 text-lg group bg-white/80"
            >
              ✅ Shop Snacks <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Right Asset Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group hidden lg:block"
        >
          <div className="relative z-10 w-full h-[500px] flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full drop-shadow-2xl"
            >
              <Image
                src="/matta-rice.png"
                alt="Premium Matta Rice"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Premium Circular Offer Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-10 -right-10 w-40 h-40 border-[20px] border-primary/5 rounded-full"
            />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary rounded-full flex flex-col items-center justify-center text-white shadow-glow border-4 border-white rotate-12">
               <div className="text-3xl font-black">-30%</div>
               <div className="text-[10px] font-black uppercase tracking-tighter">Big Savings</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
