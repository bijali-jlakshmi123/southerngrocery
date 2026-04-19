"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";

interface CategoriesClientProps {
  categories: any[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const CATEGORY_DETAILS: Record<string, any> = {
  "Rice & Rice Products": {
    badge: "8+ SUBCATEGORIES",
    popular: [
      "Matta Rice (Periyar, Double Horse, KT, Ajmi, Nila)",
      "Kaima / Jeerakasala (Meeval, Ajmi, India Gate)",
      "Basmati Rice (Tilda, India Gate, Farm Kitchen)",
      "Ponni Rice (KT, Shankar, India Gate)",
    ],
    more: 2,
  },
  "Atta, Flour & Grains": {
    badge: "10+ VARIETIES",
    popular: [
      "Pillsbury & Aashirvad Atta",
      "Ajmi Roasted Atta",
      "Ragi & Roasted Rice Powder",
      "Broken Wheat & Maida",
    ],
    more: 1,
  },
  "Pulses & Lentils": {
    badge: "15+ VARIETIES",
    popular: [
      "Uzhunnu (Urad Dal)",
      "Cherupayar (Moong Dal)",
      "Vanpayar (Red Cow Peas)",
      "Kadala (Black Chickpeas)",
    ],
    more: 1,
  },
  "Oil & Ghee": {
    badge: "3 DISTINCT TYPES",
    popular: [
      "Coconut Oil (Pavizham, Ajmi, Parachute)",
      "KTC Sunflower & Vegetable Oil",
      "Pure Ghee (GRB, Patanjali)",
      "Mustard & Gingelly Oil",
    ],
  },
  "Spices & Masala": {
    badge: "25+ TRADITIONAL BRANDS",
    popular: [
      "Whole Spices (Mustard, Jeera, Cardamom)",
      "Masala Powders (Eastern, Ajmi, Brahmins)",
      "Chilli, Turmeric & Coriander Powders",
      "Chicken, Meat & Sambar Masala",
    ],
  },
  "Frozen Foods": {
    badge: "READY-TO-STEAM",
    popular: [
      "Frozen Kappa & Jackfruit",
      "Ready Idiyappam & Porotta",
      "Grated Coconut",
      "Avial Mix & Drumsticks",
    ],
  },
  "Snacks & Sweets": {
    badge: "TRADITIONAL & PACKAGED",
    popular: [
      "Kerala Snacks (Banana Chips, Mixture)",
      "Biscuits (Parle G, Dark Fantasy)",
      "Sweets (Halwa, Soan Papdi, Laddu)",
      "Kurkure & Savoury Snacks",
    ],
  },
  "Pickles & Chutneys": {
    badge: "HOMEMADE STYLE",
    popular: [
      "Mango, Lime & Garlic Pickles",
      "Prawn & Fish Pickles",
      "Traditional Chammanthi",
    ],
  },
  "Fresh Vegetables": {
    badge: "UPDATED DAILY",
    popular: [
      "Nenthra Banana",
      "Ginger & Onion",
      "Mathanga (Pumpkin)",
      "Chena (Yam)",
    ],
  },
  Beverages: {
    badge: "TEA, COFFEE & SQUASH",
    popular: [
      "Tea (Tata, Red Label)",
      "Coffee (Nescafe, Nadan)",
      "Horlicks & Boost",
    ],
  },
  Kitchenware: {
    badge: "PRE-ORDER SECTION",
    popular: [
      "Puttu & Idiyappam Makers",
      "Pressure Cookers",
      "Traditional Chatty",
      "Mixies (Pre-order)",
    ],
  },
};

export default function CategoriesClient({
  categories,
}: CategoriesClientProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {categories.map((category) => {
          const details = CATEGORY_DETAILS[category.name] || {
            badge: "EXPLORE COLLECTION",
            popular: [],
          };

          return (
            <motion.div key={category.id} variants={item}>
              <Link
                href={`/category/${category.slug}`}
                className="group block h-full"
              >
                <div className="bg-white rounded-[40px] p-8 shadow-sm hover:shadow-premium transition-all duration-500 border border-slate-100 flex flex-col h-full relative overflow-hidden group-hover:-translate-y-2">
                  <div className="mb-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      {details.badge}
                    </span>
                  </div>

                  <div className="w-full h-44 relative mb-6 flex items-center justify-center">
                    <Image
                      src={(category.image && category.image !== 'image') ? category.image : "/placeholder.png"}
                      alt={category.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-2xl font-heading font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                    {category.name === "Fresh Vegetables"
                      ? "Fresh Vegetables – Price on Request / Updated Daily. Directly sourced fresh produce delivered across UK."
                      : `Premium ${category.name} selection, handpicked for quality and tradition.`}
                  </p>

                  {details.popular && details.popular.length > 0 && (
                    <div className="mt-auto pt-6 border-t border-slate-50">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-4">
                        Popular in this Category
                      </span>
                      <ul className="space-y-3">
                        {details.popular.map((p: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 group/item"
                          >
                            <div className="w-1 h-1 rounded-full bg-primary/30 mt-1.5 group-hover/item:scale-150 transition-transform" />
                            <span className="text-[13px] font-bold text-slate-600 group-hover/item:text-primary transition-colors leading-tight">
                              {p}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {details.more && (
                        <div className="mt-4 text-[10px] font-black text-primary uppercase tracking-widest">
                          + {details.more} MORE SUBCATEGORIES
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
