'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WhatsAppButton() {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <Link 
        href="https://wa.me/XXXXXXXXXX" 
        target="_blank"
        className="relative block group"
      >
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity animate-pulse" />
        <div className="relative w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 group-hover:scale-110 transition-transform">
           <MessageCircle size={32} />
           <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">1</div>
        </div>
        
        {/* Tooltip Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-2xl shadow-premium border border-slate-100 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
           <p className="text-xs font-black text-slate-900">Need help? <span className="text-green-500">Chat with us!</span></p>
        </div>
      </Link>
    </motion.div>
  );
}
