
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Package
} from 'lucide-react';

interface CategoriesClientProps {
  categories: any[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CategoriesClient({ categories }: CategoriesClientProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Link href={`/category/${category.slug}`} className="group block h-full">
              <div className="bg-white rounded-5xl p-8 shadow-sm hover:shadow-premium transition-all duration-500 border border-slate-100 flex flex-col h-full relative overflow-hidden group-hover:-translate-y-2">
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{category.count} Products</div>
                    <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-50 opacity-0 group-hover:opacity-100 transition-all group-hover:bg-primary group-hover:text-white text-primary`}>
                       <ArrowRight size={18} />
                    </div>
                  </div>

                  <div className="w-full h-32 relative mb-6 flex items-center justify-center p-4">
                     <motion.div
                       whileHover={{ scale: 1.1, rotate: 5 }}
                       className="relative w-full h-full"
                     >
                       <Image 
                         src={category.image || "/cat-pulses.png"} 
                         alt={category.name} 
                         fill 
                         className="object-contain"
                       />
                     </motion.div>
                  </div>

                  <h3 className="text-xl font-heading font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">
                     Authentic collection of {category.name}.
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
