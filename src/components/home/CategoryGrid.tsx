"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface CategoryGridProps {
  categories?: any[];
}

export default function CategoryGrid({ categories: dynamicCategories }: CategoryGridProps) {
  // Fallback to static if no dynamic categories are provided
  const displayCategories = dynamicCategories?.length ? dynamicCategories.map(c => ({
    name: c.name,
    image: "/cat-pulses.png", // Default image for dynamic categories
    items: `${c.count || 0} Products`,
    slug: c.slug,
    color: "primary"
  })) : [
    {
      name: "Rice",
      image: "/cat-rice.png",
      items: "Matta, Kaima, Ponni",
      color: "primary",
      slug: "rice"
    },
    {
      name: "Atta & Flour",
      image: "/cat-flour.png",
      items: "Pillsbury, Aashirvad",
      color: "accent",
      slug: "atta"
    },
    {
      name: "Pulses",
      image: "/cat-pulses.png",
      items: "Uzhunnu, Dal, Kadala",
      color: "success",
      slug: "pulses"
    },
    {
      name: "Oils",
      image: "/cat-oils.png",
      items: "Coconut, Ghee, Sunflower",
      color: "secondary",
      slug: "oils"
    },
    {
      name: "Frozen",
      image: "/cat-frozen.png",
      items: "Kappa, Porotta, Coconut",
      color: "accent",
      slug: "frozen"
    },
    {
      name: "Snacks",
      image: "/cat-snacks.png",
      items: "Banana Chips, Mixture",
      color: "primary",
      slug: "snacks"
    },
    {
      name: "Pickles",
      image: "/cat-pickles.png",
      items: "Mango, Lime, Garlic",
      color: "success",
      slug: "pickles"
    },
    {
      name: "Fresh Vegetables",
      image: "/cat-vegetables.png",
      items: "Nenthra, Ginger, Onion",
      color: "secondary",
      slug: "vegetables"
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
          {displayCategories.map((cat, i) => (
            <motion.div key={i} variants={item}>
              <Link
                href={`/category/${cat.slug}`}
                className="group block text-center space-y-4"
              >
                <div className="relative mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto transition-all duration-300 group-hover:shadow-xl border-4 border-gray-50 group-hover:border-primary relative"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
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
