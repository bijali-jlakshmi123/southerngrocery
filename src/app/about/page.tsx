'use client';

import { motion } from 'framer-motion';
import { Shrub, Heart, ShieldCheck, Truck, Users, Award, Sparkles, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Daily Orders' },
    { value: '15k+', label: 'Happy Customers' },
    { value: '100%', label: 'Authentic Quality' },
  ];

  const values = [
    { icon: <Heart size={32} />, title: 'Rooted in Tradition', desc: 'We bring you the same authentic varieties our grandmothers used in Kerala kitchens.' },
    { icon: <ShieldCheck size={32} />, title: 'Purity Guaranteed', desc: 'Zero adulteration. We source only the highest grade spices and grains for your family.' },
    { icon: <Truck size={32} />, title: 'UK-Wide Freshness', desc: 'Our logistics network ensures that even the most delicate Kerala vegetables arrive crisp.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
         <div className="absolute inset-0 opacity-40">
            <Image src="/spices-mix.png" alt="Heritage Spices" fill className="object-cover" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
         
         <div className="relative z-10 text-center section-container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md"
            >
               <Sparkles size={14} /> Our Heritage
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-heading font-black text-white tracking-tight mb-8">
               A Taste of <span className="text-secondary italic">Home</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
               Southern Spices started with a simple mission: To bring the authentic, rich culinary heritage of Kerala to every Indian household in the UK.
            </p>
         </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative -mt-16 z-20 mx-6 rounded-6xl shadow-2xl border border-slate-50 border-t-8 border-t-primary">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
               {stats.map((stat, i) => (
                 <div key={i} className="space-y-2">
                    <div className="text-5xl font-heading font-black text-slate-900">{stat.value}</div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Story Section */}
      <section className="py-32 section-container">
         <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                    From the <span className="text-primary italic">Backwaters</span> <br /> to Your Kitchen
                  </h2>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    Kerala, the "Land of Spices," has a centuries-old history of trading the world's finest Black Pepper, Cardamom, and Ginger. At Southern Spices, we honor this legacy by maintaining direct relationships with local farmers in Palakkad and Idukki.
                  </p>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    Whether it's the specific robust flavor of traditional Matta Rice or the nostalgic crunch of Hot Nendran Banana Chips, we ensure every product meets our rigorous standards of authenticity before it ever hits our UK shelves.
                  </p>
               </div>
               
               <div className="grid sm:grid-cols-2 gap-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center text-success"><Award size={24} /></div>
                     <span className="font-heading font-black text-slate-900">SGS Certified</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><Shrub size={24} /></div>
                     <span className="font-heading font-black text-slate-900">100% Natural</span>
                  </div>
               </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] rotate-3" />
               <div className="relative rounded-[4rem] overflow-hidden shadow-2xl h-[500px]">
                  <Image src="/spices-mix.png" alt="Kerala Spices" fill className="object-cover" />
               </div>
               {/* Floating elements */}
               <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-4xl shadow-2xl border border-slate-50 hidden md:block">
                  <div className="flex items-center gap-4">
                     <Users size={32} className="text-secondary" />
                     <div>
                        <div className="font-heading font-black text-slate-900">Family Owned</div>
                        <div className="text-xs font-bold text-slate-400">Est. 2014</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-slate-50">
         <div className="section-container">
            <div className="text-center mb-20 space-y-4">
               <h2 className="text-4xl font-heading font-black text-slate-900">The Southern <span className="text-primary">Standard</span></h2>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Our core philosophy for premium grocery delivery</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
               {values.map((v, i) => (
                 <div key={i} className="bg-white p-12 rounded-5xl border border-slate-100 shadow-sm hover:shadow-premium transition-all group">
                    <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-translate-y-2">
                       {v.icon}
                    </div>
                    <h3 className="text-2xl font-heading font-black text-slate-900 mb-4">{v.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-container text-center">
         <div className="bg-primary rounded-6xl p-16 md:p-24 text-white relative overflow-hidden shadow-glow">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-3xl rounded-full" />
            <div className="relative z-10">
               <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 leading-tight">Ready to taste the <br /> <span className="italic opacity-80">Authentic Kerala?</span></h2>
               <Link href="/category/rice" className="btn-base bg-white text-primary hover:bg-slate-50 shadow-2xl px-12 !py-5 text-xl flex items-center justify-center gap-3 w-fit mx-auto active:scale-95 transition-all group">
                  Start Shopping Now <ChevronRight size={24} className="group-hover:translate-x-1.5 transition-transform" />
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
