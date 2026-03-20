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
      className={`py-[80px] ${bgColor} border-t border-gray-100 relative overflow-hidden`}
    >
      <div className="max-w-8xl mx-auto px-6 font-body">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tight">
              {title.split(" ")[0]}{" "}
              <span className="text-primary">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
            <p className="text-gray-500 font-medium text-sm max-w-xl pt-2">
              {subtitle}
            </p>
          </div>
          <Link
            href={`/category/${category}`}
            className="text-primary font-bold hover:underline underline-offset-8 decoration-2 flex items-center gap-2 group text-sm uppercase tracking-wider"
          >
            Explore More <motion.span whileHover={{ x: 5 }}>→</motion.span>
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
