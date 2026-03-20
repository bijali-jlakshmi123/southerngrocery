"use client";

import {
  Wheat,
  Package,
  Droplet,
  Snowflake,
  Cookie,
  Apple,
  Shrub,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Rice",
    icon: <Waves size={36} />,
    items: "Matta, Kaima, Ponni",
    color: "primary",
  },
  {
    name: "Atta & Flour",
    icon: <Wheat size={36} />,
    items: "Pillsbury, Aashirvad",
    color: "accent",
  },
  {
    name: "Pulses",
    icon: <Package size={36} />,
    items: "Uzhunnu, Dal, Kadala",
    color: "success",
  },
  {
    name: "Oils",
    icon: <Droplet size={36} />,
    items: "Coconut, Ghee, Sunflower",
    color: "secondary",
  },
  {
    name: "Frozen",
    icon: <Snowflake size={36} />,
    items: "Kappa, Porotta, Coconut",
    color: "accent",
  },
  {
    name: "Snacks",
    icon: <Cookie size={36} />,
    items: "Banana Chips, Mixture",
    color: "primary",
  },
  {
    name: "Pickles",
    icon: <Shrub size={36} />,
    items: "Mango, Lime, Garlic",
    color: "success",
  },
  {
    name: "Fresh Vegetables",
    icon: <Apple size={36} />,
    items: "Nenthra, Ginger, Onion",
    color: "secondary",
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tight">
              Shop By Categories
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
          <Link
            href="/categories"
            className="text-primary font-bold hover:underline underline-offset-8 decoration-2 flex items-center gap-2 group text-sm uppercase tracking-wider"
          >
            View All <motion.span whileHover={{ x: 5 }}>→</motion.span>
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8"
        >
          {categories.map((cat, i) => (
            <motion.div key={i} variants={item}>
              <Link
                href={`/category/${cat.name.split(" ")[0].toLowerCase()}`}
                className="group block text-center space-y-4"
              >
                <div className="relative mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 md:w-32 md:h-32 bg-[#f8f8f8] rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg text-primary"
                  >
                    {cat.icon}
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-[14px] font-bold text-secondary group-hover:text-primary transition-colors uppercase tracking-tight">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
