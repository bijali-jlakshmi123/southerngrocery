'use client';

import { ShieldCheck, Lock, Eye, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const sections = [
    { title: 'Information Collection', desc: 'At Southern Spices, we collect and process information about you when you provide it to us directly, such as when you create an account, place an order, or subscribe to our newsletter.' },
    { title: 'Information Usage', desc: 'We only use your information to provide and improve our services, including processing your orders, providing customer support, and personalizing your shopping experience.' },
    { title: 'Data Security', desc: 'We take data security very seriously and implement appropriate technical and organizational measures to protect your information from unauthorized access, loss, or theft.' },
    { title: 'Cookie Policy', desc: 'We use cookies and similar tracking technologies to track the activity on our site and hold certain information, ensuring a smooth and personalized shopping experience for you.' },
    { title: 'User Rights', desc: 'You have the right to access, update, or delete your information at any time. If you have any questions or concern about our privacy practices, please contact us.' },
  ];

  return (
    <div className="section-container pt-12 pb-24 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left: Sidebar Navigation Sidebar */}
        <aside className="lg:w-80 space-y-10 group">
           <div className="bg-white p-10 rounded-5xl border border-slate-50 shadow-premium sticky top-28">
              <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                 <ShieldCheck size={32} />
              </div>
              <h1 className="text-3xl font-heading font-black text-slate-900 leading-tight mb-8">Privacy & <span className="text-primary italic">Security</span></h1>
              <ul className="space-y-6">
                {sections.map((s, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-primary transition-colors cursor-pointer group/link">
                      <div className="w-1.5 h-1.5 bg-slate-100 rounded-full group-hover/link:bg-primary transition-all group-hover/link:scale-125" />
                      {s.title}
                   </li>
                ))}
              </ul>
              
              <div className="mt-12 pt-8 border-t border-slate-50">
                 <Link href="/contact" className="text-xs font-black text-primary underline underline-offset-4 decoration-2">Have a question?</Link>
              </div>
           </div>
        </aside>

        {/* Right: Policy Content Content */}
        <div className="flex-1 max-w-4xl space-y-20">
           <div className="space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-4">
                 Last Updated: Oct 2023 <span className="opacity-20 text-slate-900">|</span> 12 Min Read
              </div>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                 Southern Spices is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
              </p>
           </div>

           <div className="grid gap-12">
              {sections.map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-4xl border border-slate-50 shadow-sm hover:shadow-premium transition-all"
                >
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary"><CheckCircle size={20} /></div>
                      <h2 className="text-2xl font-heading font-black text-slate-900">{s.title}</h2>
                   </div>
                   <p className="text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
           </div>

           <div className="bg-slate-900 rounded-5xl p-12 text-white relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-30" />
              <div className="relative z-10 space-y-6">
                 <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md mx-auto">
                    <Lock size={40} className="text-primary-light" />
                 </div>
                 <h3 className="text-3xl font-heading font-black">Your Data, Your Ownership</h3>
                 <p className="text-slate-300 font-medium max-w-md mx-auto">We do not sell our customer data to third parties. Your shopping habits with Southern Spices remain private.</p>
                 <Link href="/" className="btn-base bg-white text-slate-900 !py-4 px-12 inline-block font-black uppercase text-xs tracking-widest active:scale-95 transition-all">Back to Home</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
