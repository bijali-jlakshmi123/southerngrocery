'use client';

import { Wheat, Package, Droplet, Snowflake, Cookie, Apple, Shrub, Waves } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Rice', icon: <Waves size={36} />, items: 'Matta, Kaima, Ponni', color: 'primary' },
  { name: 'Atta & Flour', icon: <Wheat size={36} />, items: 'Pillsbury, Aashirvad', color: 'accent' },
  { name: 'Pulses', icon: <Package size={36} />, items: 'Uzhunnu, Dal, Kadala', color: 'success' },
  { name: 'Oils', icon: <Droplet size={36} />, items: 'Coconut, Ghee, Sunflower', color: 'secondary' },
  { name: 'Frozen', icon: <Snowflake size={36} />, items: 'Kappa, Porotta, Coconut', color: 'accent' },
  { name: 'Snacks', icon: <Cookie size={36} />, items: 'Banana Chips, Mixture', color: 'primary' },
  { name: 'Pickles', icon: <Shrub size={36} />, items: 'Mango, Lime, Garlic', color: 'success' },
  { name: 'Fresh Vegetables', icon: <Apple size={36} />, items: 'Nenthra, Ginger, Onion', color: 'secondary' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 leading-tight">
                Shop By <span className="text-primary italic">Category</span>
              </h2>
              <p className="text-slate-500 font-medium text-base max-w-xl">Browse our curated collection of authentic Indian groceries.</p>
           </div>
           <Link href="/categories" className="text-primary font-bold hover:underline underline-offset-8 decoration-2 flex items-center gap-2 group">
              View All Categories <motion.span whileHover={{ x: 5 }}>→</motion.span>
           </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10"
        >
           {categories.map((cat, i) => (
             <motion.div key={i} variants={item}>
               <Link 
                 href={`/category/${cat.name.split(' ')[0].toLowerCase()}`}
                 className="group block text-center space-y-4"
               >
                  <motion.div 
                     whileHover={{ scale: 1.05, y: -5 }}
                     className={`w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto transition-all duration-300 group-hover:shadow-premium group-hover:border-primary/20 group-hover:bg-white text-${cat.color}`}
                  >
                     {cat.icon}
                  </motion.div>
                  <div className="space-y-1">
                     <h3 className="text-lg font-heading font-black text-slate-900 group-hover:text-primary transition-colors">{cat.name}</h3>
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{cat.items}</p>
                  </div>
               </Link>
             </motion.div>
           ))}
        </motion.div>
      </div>
    </section>
  );
}
