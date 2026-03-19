"use client";

import ProductCard from "../common/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedProductsProps {
  title: string;
  subtitle: string;
  category: string;
  products: any[];
  bgColor?: string;
  accentColor?: string;
}

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

export default function FeaturedProducts({
  title,
  subtitle,
  category,
  products,
  bgColor = "bg-white",
  accentColor = "text-primary",
}: FeaturedProductsProps) {
  return (
    <section
      className={`py-16 ${bgColor} border-t border-slate-50 relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 leading-[1.1]">
              {title.split(" ")[0]}{" "}
              <span className={accentColor}>
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="text-slate-500 font-medium text-base max-w-xl">
              {subtitle}
            </p>
          </div>
          <Link
            href={`/category/${category}`}
            className="btn-base btn-outline !rounded-2xl !px-10 group whitespace-nowrap"
          >
            Explore All{" "}
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((p) => (
            <motion.div key={p.id} variants={item}>
              <ProductCard {...p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
