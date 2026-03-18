'use client';

import { ShoppingCart, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart, useAuth, useWishlist } from '@/lib/store';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { clsx } from "clsx";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  slug: string;
}

export default function ProductCard({ id, name, price, originalPrice, category, image, slug }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const { user } = useAuth();
  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id, user?.id || 'guest');
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({ 
      id, 
      name, 
      price: price.toString(), 
      images: [{ src: image }],
      slug 
    }, 1, user?.id || 'guest');

    toast.success(`${name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleItem({
      id,
      name,
      price: price.toString(),
      imageUrl: image,
      slug
    }, user?.id || 'guest');

    if (!inWishlist) {
      toast.info(`${name} saved to wishlist!`, {
        position: "bottom-right",
        autoClose: 2000,
        icon: <Heart className="fill-secondary text-secondary" size={16} />
      });
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-5xl p-5 shadow-sm hover:shadow-premium transition-all duration-500 border border-slate-100 flex flex-col h-full relative"
    >
      <div className="relative aspect-square bg-slate-50 rounded-4xl overflow-hidden mb-6 flex items-center justify-center group/img">
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-secondary text-white text-[11px] font-black px-3 py-1 rounded-full z-10 shadow-lg">
            -{discount}% OFF
          </div>
        )}
        
        <button 
          onClick={handleToggleWishlist}
          className={clsx(
            "absolute top-4 right-4 p-2.5 rounded-2xl shadow-sm backdrop-blur-md transition-all z-10",
            inWishlist 
              ? "bg-secondary text-white shadow-secondary/20" 
              : "bg-white/80 text-slate-300 hover:text-secondary"
          )}
        >
          <Heart size={20} className={inWishlist ? "fill-white" : ""} />
        </button>

        <motion.div 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative"
        >
          <Image 
            src={image || '/placeholder.png'} 
            alt={name}
            fill
            className="object-cover"
          />
        </motion.div>
        
        <div className="absolute inset-x-4 bottom-4 lg:transform lg:translate-y-12 opacity-100 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
           <button 
             onClick={handleAddToCart}
             className="w-full btn-base btn-primary !py-3 !rounded-2xl shadow-2xl active:scale-95 transition-transform"
           >
              <ShoppingCart size={18} /> Quick Add
           </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-1">
         <div className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">{category}</div>
         <h3 className="text-sm md:text-base font-heading font-black text-slate-900 leading-tight mb-3 line-clamp-2">
           {name}
         </h3>
         
         <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
            <div className="flex flex-col">
               {originalPrice && (
                 <span className="text-slate-300 text-[10px] line-through font-bold">£{originalPrice.toFixed(2)}</span>
               )}
               <span className="text-primary font-black text-xl">£{price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl">
               <Star size={12} className="fill-yellow-400 text-yellow-400" />
               <span className="text-[10px] font-black text-slate-600">4.8</span>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
