'use client';

import ProductCard from '../common/ProductCard';
import { Tag, Timer, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const deals = [
  { id: 1, name: 'Double Horse Matta Rice 5kg', price: 9.49, originalPrice: 12.99, image: '/matta-rice.png', category: 'Rice', slug: 'matta-rice' },
  { id: 2, name: 'Premium Coconut Oil 1L', price: 3.49, originalPrice: 5.50, image: '/coconut-oil.png', category: 'Oils', slug: 'coconut-oil' },
  { id: 3, name: 'Boiled Kerala Kappa 1kg', price: 2.99, originalPrice: 3.99, image: '/kappa.png', category: 'Frozen', slug: 'kappa' },
  { id: 4, name: 'Eastern Chicken Masala 100g', price: 0.79, originalPrice: 1.25, image: '/spices-mix.png', category: 'Spices', slug: 'chicken-masala' },
  { id: 5, name: 'Fresh Kerala Vegetables Tray', price: 2.25, originalPrice: 3.49, image: '/fresh-veg.png', category: 'Vegetables', slug: 'fresh-veg' },
];

export default function WeeklyDeals() {
  return (
    <section className="py-24 bg-surface-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
           <div className="space-y-6">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.2em] bg-secondary/5 px-5 py-2.5 rounded-full border border-secondary/10 shadow-sm"
              >
                 <Timer size={16} /> Deals Ending Soon!
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                Weekly <span className="text-secondary italic">Deals</span> & Offers
              </h2>
              <p className="text-slate-500 font-medium text-lg max-w-xl">Save big on your favorite authentic Indian brands Every Single Week.</p>
           </div>
           
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="btn-base bg-secondary hover:bg-secondary-dark text-white shadow-premium group"
           >
              View All Offers <Tag size={18} className="group-hover:rotate-12 transition-transform" />
           </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
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
