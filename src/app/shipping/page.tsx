'use client';

import { Truck, Clock, MapPin, Package, ShieldCheck, ChevronRight, Globe, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ShippingPage() {
  const tiers = [
    { icon: <Truck size={32} />, title: 'Standard UK Delivery', time: '3-5 Business Days', price: '£5.99', free: 'FREE above £50', desc: 'Our most popular option for households across Central UK and Scotland.' },
    { icon: <Clock size={32} />, title: 'Express Same-Day Dispatch', time: '1-2 Business Days', price: '£9.99', desc: 'Order by 2PM and we will ship your spices the same day! Ideal for fresh vegetable orders.' },
    { icon: <Globe size={32} />, title: 'Northern Ireland & Offshore', time: '5-7 Business Days', price: '£14.99', desc: 'Special logistics handling for our customers in harder-to-reach UK locations.' },
  ];

  return (
    <div className="section-container pt-12 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-24 space-y-8">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 bg-secondary/5 text-secondary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm"
         >
            <Truck size={14} /> Shipping Information
         </motion.div>
         <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 leading-[1.1] tracking-tight">
            Fast Delivery to <span className="text-primary italic">Every Corner</span> of UK
         </h1>
         <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            We understand the nostalgia for home flavors. That's why we've partnered with the UK's top logistics providers to ensure your Southern Spices arrive fresh and intact.
         </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 mb-32">
         {tiers.map((tier, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-12 rounded-5xl border border-slate-50 shadow-sm hover:shadow-premium transition-all group flex flex-col items-center text-center"
           >
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6 mb-8">
                 {tier.icon}
              </div>
              <h3 className="text-2xl font-heading font-black text-slate-900 mb-2">{tier.title}</h3>
              <div className="text-primary font-black text-lg italic mb-2">{tier.price}</div>
              <div className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6">{tier.time}</div>
              <p className="text-slate-500 font-medium leading-relaxed mb-6 flex-1">{tier.desc}</p>
              {tier.free && <div className="bg-success/5 text-success text-[10px] font-black px-6 py-2 rounded-full border border-success/10">{tier.free}</div>}
           </motion.div>
         ))}
      </div>

      {/* Packaging Standards Section Standards Section */}
      <div className="grid lg:grid-cols-2 gap-20 items-center bg-slate-900 rounded-6xl p-16 md:p-24 text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-30" />
         
         <div className="space-y-10 relative z-10">
            <div className="space-y-6">
               <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight">
                 Premium <span className="text-secondary opacity-80">Packaging</span> <br /> for Maximum Freshness
               </h2>
               <p className="text-slate-400 font-medium text-lg leading-relaxed">
                 We don't just ship groceries; we ship memories. Our specialized vacuum-tight packaging and thermal-lined boxes for frozen foods ensure your products arrive in pristine condition.
               </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
               <div className="flex items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-colors">
                  <div className="text-primary-light"><Package size={32} /></div>
                  <div>
                    <div className="text-lg font-heading font-black">Vacuum Sealed</div>
                    <div className="text-sm font-medium text-slate-400">Locked-in Aroma</div>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-colors">
                  <div className="text-success"><ShieldCheck size={32} /></div>
                  <div>
                    <div className="text-lg font-heading font-black">Fragile Care</div>
                    <div className="text-sm font-medium text-slate-400">Zero Damage Guarantee</div>
                  </div>
               </div>
            </div>

            <Link href="/contact" className="btn-base bg-white text-slate-900 !py-4 px-12 inline-block font-heading font-black tracking-widest text-sm hover:bg-slate-50 active:scale-95 transition-all">
               Track Your Delivery <ChevronRight size={18} className="inline-block ml-1" />
            </Link>
         </div>

         <div className="relative hidden lg:block h-full min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
               className="w-full h-full bg-white/10 rounded-4xl border border-white/20 p-8 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-3xl overflow-hidden"
            >
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
               <Package size={200} className="text-white/20 absolute opacity-20" />
               <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4 mb-4 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-3 bg-white/20 rounded-full" />
                    <div className="w-6 h-6 bg-primary rounded-full" />
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                     <motion.div animate={{ width: ['0%', '80%', '80%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-primary shadow-glow" />
                  </div>
               </div>
               <div className="text-xs font-black uppercase tracking-widest opacity-40">Shipment ID: SS-UK-9214</div>
            </motion.div>
         </div>
      </div>

      {/* Map Note Section Map Note Section */}
      <div className="mt-24 text-center space-y-6">
         <div className="flex justify-center gap-4 text-slate-300">
            <Info size={24} />
         </div>
         <h4 className="text-2xl font-heading font-black text-slate-900 uppercase tracking-tighter">Serving Over 180 Districts UK-wide</h4>
         <p className="text-slate-400 font-medium max-w-lg mx-auto italic">Due to ferry schedules, deliveries to the Isle of Wight and Scottish Highlands may sometimes experience a 24-48 hour additional delay. We appreciate your patience.</p>
      </div>
    </div>
  );
}
