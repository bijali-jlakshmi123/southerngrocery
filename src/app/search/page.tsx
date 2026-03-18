'use client';

import { useSearchParams } from 'next/navigation';
import { Search, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/common/ProductCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Mock results (In a real app, fetch from WooCommerce based on query)
  const results = [
    { id: 1, name: 'Premium Kerala Matta Rice', price: 12.50, originalPrice: 15.00, image: '/matta-rice.png', category: 'Rice', slug: 'matta-rice' },
    { id: 10, name: 'Double Horse Chili Powder', price: 2.50, image: '/spices-mix.png', category: 'Spices', slug: 'chili-powder' },
  ].filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="section-container pt-12 pb-24">
      <div className="mb-16">
         <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            <Search size={14} /> Search Results
         </div>
         <h1 className="text-5xl font-heading font-black text-slate-900 tracking-tight">
           {results.length > 0 ? `Results for "${query}"` : `No results found for "${query}"`}
         </h1>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {results.map((p) => (
             <motion.div 
               key={p.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
             >
                <ProductCard {...p} />
             </motion.div>
           ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-slate-50 rounded-5xl border border-slate-100 italic font-medium text-slate-400">
          Try searching for something else, like "Rice" or "Snacks".
        </div>
      )}
    </div>
  );
}
