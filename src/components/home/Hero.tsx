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
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-mint/50 py-12 lg:py-20 px-6">
      <div className="max-w-8xl mx-auto grid lg:grid-cols-2 items-center gap-16 w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-bold text-sm uppercase tracking-widest"
            >
              UK's Favorite Kerala Store
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary leading-[1.1]">
              Authentic Kerala <br />
              <span className="text-primary">Groceries</span> <br />
              Delivered in UK
            </h1>

            <p className="text-lg text-muted-DEFAULT max-w-xl leading-relaxed">
              Experience the true taste of Kerala with our handpicked collection of Matta Rice, Spices, Snacks, and Fresh Vegetables.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/category/rice"
              className="btn-base btn-primary !rounded-lg !px-10 py-4 shadow-lg hover:shadow-primary/20"
            >
              Shop Rice
            </Link>
            <Link
              href="/category/snacks"
              className="btn-base bg-white text-secondary border border-gray-200 !rounded-lg !px-10 py-4 hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              Browse Snacks
            </Link>
          </div>
        </motion.div>

        {/* Right Asset Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group hidden lg:block"
        >
          <div className="relative z-10 w-full h-[450px] flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/matta-rice.png"
                alt="Premium Matta Rice"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Price/Offer Badge */}
            <div className="absolute top-10 right-10 w-28 h-28 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-xl border-4 border-white -rotate-12">
              <div className="text-2xl font-bold">BEST</div>
              <div className="text-[10px] font-medium uppercase">Price</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
