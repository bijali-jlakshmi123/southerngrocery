"use client";

import ProductCard from "../common/ProductCard";
import { Tag, Timer, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const deals = [
  {
    id: 1,
    name: "Double Horse Matta Rice 5kg",
    price: 9.49,
    originalPrice: 12.99,
    image: "/matta-rice.png",
    category: "Rice",
    slug: "matta-rice",
  },
  {
    id: 2,
    name: "Premium Coconut Oil 1L",
    price: 3.49,
    originalPrice: 5.5,
    image: "/coconut-oil.png",
    category: "Oils",
    slug: "coconut-oil",
  },
  {
    id: 3,
    name: "Boiled Kerala Kappa 1kg",
    price: 2.99,
    originalPrice: 3.99,
    image: "/kappa.png",
    category: "Frozen",
    slug: "kappa",
  },
  {
    id: 4,
    name: "Eastern Chicken Masala 100g",
    price: 0.79,
    originalPrice: 1.25,
    image: "/spices-mix.png",
    category: "Spices",
    slug: "chicken-masala",
  },
  {
    id: 5,
    name: "Fresh Kerala Vegetables Tray",
    price: 2.25,
    originalPrice: 3.49,
    image: "/fresh-veg.png",
    category: "Vegetables",
    slug: "fresh-veg",
  },
];

export default function WeeklyDeals() {
  return (
    <section className="py-[80px] bg-[#f8f8f8] border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tight">
              Weekly Offers
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
            <p className="text-gray-500 font-medium text-sm max-w-xl pt-2">
              Save big on your favorite authentic Indian brands Every Single
              Week.
            </p>
          </div>

          <Link
            href="/offers"
            className="text-primary font-bold hover:underline underline-offset-8 decoration-2 flex items-center gap-2 group text-sm uppercase tracking-wider"
          >
            All Offers <motion.span whileHover={{ x: 5 }}>→</motion.span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {deals.map((deal) => (
            <ProductCard key={deal.id} {...deal} />
          ))}
        </motion.div>

        {/* Decorative corner element */}
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
          <Sparkles size={200} className="text-secondary" />
        </div>
      </div>
    </section>
  );
}
