'use client';

import { Tag, Timer, Flame, Sparkles, Percent, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/common/ProductCard';
import { useState, useEffect } from 'react';

export default function OffersPage() {
  const [timeLeft, setTimeLeft] = useState('23:59:59');

  // Simple countdown effect simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredDeals = [
    { id: 101, name: 'Double Horse Matta Rice 5kg', price: 9.99, originalPrice: 12.99, image: '/matta-rice.png', category: 'Rice', slug: 'matta-rice', badge: 'Save £3.00' },
    { id: 201, name: 'Traditional Banana Chips 500g', price: 1.49, originalPrice: 1.99, image: '/banana-chips.png', category: 'Snacks', slug: 'banana-chips', badge: 'Flash Deal' },
    { id: 301, name: 'Premium Coconut Oil 1L', price: 3.99, originalPrice: 5.50, image: '/coconut-oil.png', category: 'Oils', slug: 'coconut-oil', badge: 'Best Seller' },
  ];

  const allOffers = [
    { id: 401, name: 'Homemade Mango Pickle', price: 2.49, originalPrice: 3.49, image: '/mango-pickle.png', category: 'Pickles', slug: 'mango-pickle' },
    { id: 501, name: 'Eastern Chicken Masala 100g', price: 0.89, originalPrice: 1.25, image: '/spices-mix.png', category: 'Spices', slug: 'chicken-masala' },
    { id: 601, name: 'Fresh Kerala Vegetables Tray', price: 4.50, originalPrice: 5.50, image: '/fresh-veg.png', category: 'Vegetables', slug: 'fresh-veg' },
    { id: 701, name: 'Double Horse Jeerakasala 5kg', price: 15.00, originalPrice: 18.00, image: '/matta-rice.png', category: 'Rice', slug: 'jeerakasala' },
  ];

  return (
    <div className="min-h-screen pt-12 pb-24">
      {/* Hero Banner Section */}
      <div className="section-container mb-24">
         <div className="relative rounded-6xl overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/5 p-12 md:p-20 border border-secondary/10 shadow-sm">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary/5 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="space-y-8 text-center md:text-left">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-glow"
                  >
                     <Percent size={14} /> Weekly Super Deals
                  </motion.div>
                  <h1 className="text-6xl lg:text-7xl font-heading font-black text-slate-900 tracking-tight leading-[1.1]">
                    Flash <span className="text-secondary italic">Offers</span> <br /> Ending Soon!
                  </h1>
                  <p className="max-w-md text-slate-500 font-medium text-lg leading-relaxed">
                    Grab your Kerala essentials at unbeatable prices. Limited stock available on all discounted items.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                     <div className="bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ends In</div>
                        <div className="text-3xl font-heading font-black text-secondary tabular-nums">{timeLeft}</div>
                     </div>
                     <div className="bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Max Discount</div>
                        <div className="text-3xl font-heading font-black text-primary">UP TO 40%</div>
                     </div>
                  </div>
               </div>

               <div className="relative w-full max-w-sm aspect-square">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                    className="absolute inset-0 border-2 border-dashed border-secondary/20 rounded-full"
                  />
                  <div className="absolute inset-8 bg-white rounded-full shadow-2xl flex items-center justify-center p-8 overflow-hidden group">
                     {/* Floating Badge */}
                     <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary text-white rounded-full flex flex-col items-center justify-center font-heading font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                        <span className="text-3xl">£9.99</span>
                        <span className="text-[10px] opacity-75">HOT DEAL</span>
                     </div>
                     <img src="/matta-rice.png" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt="Flash Deal" />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Featured Hot Deals Grid */}
      <div className="section-container mb-24">
         <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary"><Flame size={24} /></div>
            <h2 className="text-3xl font-heading font-black text-slate-900">Featured <span className="text-secondary">Hot Picks</span></h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDeals.map((deal) => (
              <div key={deal.id} className="relative group">
                 <div className="absolute -top-3 left-6 z-20 bg-secondary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg scale-110 group-hover:scale-125 transition-transform uppercase tracking-widest">
                    {deal.badge}
                 </div>
                 <ProductCard {...deal} />
              </div>
            ))}
         </div>
      </div>

      {/* All Member Offers */}
      <div className="section-container">
         <div className="flex items-center justify-between mb-12 border-b pb-8 border-slate-100">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><Tag size={24} /></div>
               <h2 className="text-3xl font-heading font-black text-slate-900">All Member <span className="text-primary">Offers</span></h2>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Showing {allOffers.length} additional deals</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allOffers.map((deal) => (
               <ProductCard key={deal.id} {...deal} />
            ))}
         </div>

         {/* Trust strip in offers */}
         <div className="mt-24 bg-slate-50 rounded-5xl p-12 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-premium border border-slate-50 text-success">
               <Sparkles size={40} />
            </div>
            <h3 className="text-2xl font-heading font-black text-slate-900">New Deals Every Monday!</h3>
            <p className="max-w-md text-slate-500 font-medium">Don't see your favourite item? Follow our daily stories or sign up for UK-wide delivery notifications.</p>
            <button className="btn-base btn-primary !rounded-2xl shadow-glow flex items-center gap-2 group">
               Shop Exclusive Packs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}
