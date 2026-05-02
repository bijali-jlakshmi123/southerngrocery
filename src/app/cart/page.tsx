'use client';

import { useCart, useAuth, CartItem } from '@/lib/store';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const { userCarts, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  
  const items: CartItem[] = userCarts[userId] || [];
  const subtotal = getTotalPrice(userId);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.2; // 20% VAT
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-height-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200"
        >
          <ShoppingBag size={48} />
        </motion.div>
        <h2 className="text-3xl font-heading font-black text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Let's find some spices!</p>
        <Link href="/" className="btn-base btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="section-container min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b pb-6 border-slate-100">
            <h1 className="text-4xl font-heading font-black text-slate-900">Your Basket</h1>
            <span className="text-slate-400 font-bold">{getTotalItems(userId)} Items</span>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-50 flex items-center gap-6"
                >
                  <div className="w-24 h-24 relative bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src={(item.imageUrl && item.imageUrl !== 'image') ? item.imageUrl : "/placeholder.png"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-black text-lg text-slate-900 truncate">{item.name}</h3>
                    <p className="text-primary font-black mb-4">£{parseFloat(item.price).toFixed(2)}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-slate-50 rounded-xl px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1, userId)}
                          className="p-2 hover:text-primary transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-black text-slate-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1, userId)}
                          className="p-2 hover:text-primary transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, userId)}
                        className="text-slate-300 hover:text-secondary transition-colors"
                      >
                         <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:block text-right">
                    <p className="text-xl font-heading font-black text-slate-900">
                      £{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-5xl p-8 shadow-premium border border-slate-50">
            <h2 className="text-2xl font-heading font-black text-slate-900 mb-8 border-b pb-6 border-slate-50 text-center uppercase tracking-widest">
              Summary
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500 font-bold">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-bold">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-success' : ''}>
                  {shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 font-bold">
                <span>Tax (VAT 20%)</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-50 pt-4 mt-4 flex justify-between items-center">
                <span className="text-xl font-heading font-black text-slate-900">Total</span>
                <span className="text-3xl font-heading font-black text-primary">£{total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" className="w-full btn-base btn-primary !py-4 shadow-glow flex justify-center items-center gap-3">
              Checkout Now <ArrowRight size={20} />
            </Link>

            <div className="mt-8 pt-8 border-t border-slate-50 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">We Accept</p>
              <div className="flex justify-center gap-3 mt-4 opacity-40 grayscale">
                 <span className="font-bold text-[10px]">VISA</span>
                 <span className="font-bold text-[10px]">MASTERCARD</span>
                 <span className="font-bold text-[10px]">AMEX</span>
                 <span className="font-bold text-[10px]">PAYPAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
