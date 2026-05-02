'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  ShoppingBag,
  Package,
  ArrowRight
} from 'lucide-react';
import { useWishlist, useCart, useAuth } from '@/lib/store';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const { userWishlists, removeItem } = useWishlist();
  const wishItems = userWishlists[userId] || [];
  const { addItem } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      images: [{ src: item.imageUrl }],
      slug: item.slug
    }, 1, userId);
    toast.success(`${item.name} added to cart!`);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Breadcrumb & Header Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
           <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-black uppercase tracking-widest group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                My <span className="text-primary italic">Wishlist</span>
              </h1>
              <p className="text-slate-500 font-medium">Your favorite Kerala staples saved for later.</p>
           </div>
           
           <div className="bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                 <Heart size={28} className="fill-primary" />
              </div>
              <div>
                 <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Total Items</div>
                 <div className="text-2xl font-black text-slate-900">{wishItems.length} Products</div>
              </div>
           </div>
        </div>

        {wishItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <AnimatePresence>
              {wishItems.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-premium transition-all duration-300 border border-slate-100 group"
                >
                  {/* Image Product */}
                  <Link href={`/product/${item.slug}`} className="relative w-40 h-40 bg-slate-50 rounded-3xl flex-shrink-0 flex items-center justify-center overflow-hidden group-hover:bg-white transition-colors">
                     <Image 
                       src={(item.imageUrl && item.imageUrl !== 'image') ? item.imageUrl : "/placeholder.png"} 
                       alt={item.name} 
                       width={160} 
                       height={160} 
                       className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                     />
                  </Link>

                  {/* Info Product */}
                  <div className="flex-1 text-center md:text-left space-y-2">
                     <Link href={`/product/${item.slug}`} className="text-xl md:text-2xl font-heading font-black text-slate-900 hover:text-primary transition-colors">
                        {item.name}
                     </Link>
                     <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="text-2xl font-black text-primary">£{parseFloat(item.price).toFixed(2)}</span>
                        <span className="text-sm font-black text-success-light bg-success/5 px-3 py-1 rounded-full border border-success/10 uppercase tracking-widest">In Stock</span>
                     </div>
                  </div>

                  {/* Actions Product */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                     <button 
                       onClick={() => handleAddToCart(item)}
                       className="w-full sm:w-auto btn-base bg-primary text-white hover:bg-primary-dark shadow-lg px-8 py-4 flex items-center justify-center gap-3 rounded-2xl group/btn"
                     >
                        Add to Cart <ShoppingCart size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                     <button 
                       onClick={() => removeItem(item.id, userId)}
                       className="w-full sm:w-auto p-4 md:p-5 bg-slate-50 text-slate-400 hover:bg-secondary/5 hover:text-secondary rounded-2xl transition-all border border-slate-100 hover:border-secondary/10"
                       title="Remove from wishlist"
                     >
                        <Trash2 size={24} />
                     </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-5xl p-16 md:p-32 text-center border-2 border-dashed border-slate-200">
             <div className="w-24 h-24 bg-slate-50 rounded-4xl flex items-center justify-center mx-auto mb-10 text-slate-300">
                <Heart size={48} />
             </div>
             <h2 className="text-3xl font-heading font-black text-slate-900 mb-6 font-primary">Your Wishlist is Empty</h2>
             <p className="text-slate-500 font-medium max-w-lg mx-auto mb-12 text-lg">
                Seems like you haven't saved any of our authentic Kerala treasures yet. Browse our full collection and start planning your next traditional meal!
             </p>
             <Link href="/categories" className="btn-base btn-primary px-12 py-5 text-lg inline-flex items-center gap-3">
                Start Exploring <ArrowRight size={20} />
             </Link>
          </div>
        )}
      </div>
    </main>
  );
}
