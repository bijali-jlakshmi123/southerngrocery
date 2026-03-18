'use client';

import { useCart, useAuth, useWishlist } from '@/lib/store';
import { ShoppingCart, Star, Heart, Share2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, use } from 'react';
import { toast } from 'react-toastify';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { user } = useAuth();

  // Mock product data (this would actually fetch from WooCommerce)
  const product = {
    id: 101,
    name: 'Kerala Matta Rice - Premium Double Horse (10kg)',
    price: 18.50,
    originalPrice: 22.00,
    category: 'Rice & Grains',
    image: '/matta-rice.png', 
    description: 'Authentic Kerala Matta Rice, also known as Rosematta rice, is locally grown in the Palakkad district of Kerala. This premium Double Horse variety is parboiled with the husk, making it more nutritious than white rice. It has a unique robust earthy flavor and a coarse texture that is perfect for traditional Kerala meals.',
    slug: resolvedParams.slug,
    rating: 4.9,
    reviews: 124,
    stockStatus: 'In Stock',
    features: [
      'Authentic Palakkad Variety',
      'Rich in Minerals & Nutrients',
      'Naturally Gluten-Free',
      'Premium Double Horse Quality'
    ]
  };

  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id, user?.id || 'guest');
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price.toString(), 
      images: [{ src: product.image }],
      slug: product.slug 
    }, quantity, user?.id || 'guest');

    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  const handleToggleWishlist = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      imageUrl: product.image,
      slug: product.slug
    }, user?.id || 'guest');

    if (!inWishlist) {
      toast.info(`${product.name} saved to wishlist!`, {
        position: "bottom-right",
        autoClose: 2000,
        icon: <Heart className="fill-secondary text-secondary" size={16} />
      });
    }
  };

  return (
    <div className="section-container pt-8 pb-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-12">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category.toLowerCase().replace(/ & /g, '-')}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-slate-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-24">
        {/* Left: Product Images */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square bg-slate-50 rounded-5xl overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center group"
          >
            {discount > 0 && (
              <div className="absolute top-8 left-8 bg-secondary text-white text-sm font-black px-4 py-1.5 rounded-full z-10 shadow-lg">
                -{discount}% OFF
              </div>
            )}
            <Image 
              src={product.image || '/placeholder.png'} 
              alt={product.name} 
              fill 
              className="object-contain group-hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
        </div>

        {/* Right: Product Details Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
               <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{product.category}</span>
               <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-black text-slate-700">{product.rating}</span>
                  <span className="text-xs text-slate-400 font-bold">({product.reviews} reviews)</span>
               </div>
            </div>
            <h1 className="text-4xl xl:text-5xl font-heading font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              {product.name}
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-xl">
              {product.description}
            </p>
          </div>

          <div className="bg-slate-50 rounded-5xl p-8 mb-10 border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
             
             <div className="flex items-baseline gap-4 mb-8">
               <span className="text-4xl font-heading font-black text-primary">£{product.price.toFixed(2)}</span>
               {product.originalPrice && (
                 <span className="text-xl text-slate-300 line-through font-bold">£{product.originalPrice.toFixed(2)}</span>
               )}
               <span className="ml-2 text-success font-black text-xs uppercase tracking-widest">{product.stockStatus}</span>
             </div>

             <div className="flex flex-wrap items-center gap-6">
               <div className="flex items-center bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-xl"><Minus size={18} /></button>
                  <span className="w-10 text-center font-black text-slate-900">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-xl"><Plus size={18} /></button>
               </div>
               <button 
                 onClick={handleAddToCart}
                 className="flex-1 btn-base btn-primary !py-4 shadow-glow flex items-center justify-center gap-3 active:scale-95"
               >
                  <ShoppingCart size={20} /> Add to Basket
               </button>
               <button 
                 onClick={handleToggleWishlist}
                 className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                   inWishlist 
                   ? 'bg-secondary border-secondary text-white shadow-lg' 
                   : 'bg-white border-slate-100 text-slate-300 hover:text-secondary'
                 }`}
               >
                 <Heart size={24} className={inWishlist ? "fill-white" : ""} />
               </button>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
             {product.features.map((f, i) => (
               <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm group">
                  <div className="w-8 h-8 bg-success/10 text-success rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-success group-hover:text-white transition-all shadow-sm"><CheckCircle2 size={16} /></div>
                  <span className="text-xs font-bold text-slate-600 truncate">{f}</span>
               </div>
             ))}
          </div>

          <div className="space-y-4 pt-10 border-t border-slate-100">
             <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-white group-hover:shadow-lg"><Truck size={20} /></div>
                <div>
                   <div className="text-xs font-black text-slate-900">Next Day Delivery Available</div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">UK Wide Shipping</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <FeaturedProducts 
        title="Matching Brands" 
        subtitle="Complete your Kerala feast with these handpicked traditional items."
        category="rice"
        products={[
          { id: 2, name: 'Double Horse Jeerakasala Rice', price: 18.00, originalPrice: 20.00, image: '/matta-rice.png', category: 'Rice & Grains', slug: 'jeerakasala-rice' },
          { id: 3, name: 'India Gate Basmati Rice', price: 22.50, originalPrice: 24.50, image: '/matta-rice.png', category: 'Rice & Grains', slug: 'basmati-rice' },
          { id: 4, name: 'Pavizham Brown Rice', price: 14.50, originalPrice: 17.00, image: '/matta-rice.png', category: 'Rice & Grains', slug: 'brown-rice' },
          { id: 10, name: 'Homemade Mango Pickle', price: 4.50, image: '/mango-pickle.png', category: 'Pickles', slug: 'mango-pickle' }
        ]}
        accentColor="text-accent" 
        bgColor="bg-slate-50/50"
      />
    </div>
  );
}
