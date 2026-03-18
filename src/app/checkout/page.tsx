"use client";

import { useCart, useAuth, CartItem } from "@/lib/store";
import {
  ChevronRight,
  Truck,
  CreditCard,
  ShieldCheck,
  MapPin,
  User,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user, logout } = useAuth();
  const userId = user?.id || "guest";
  const { userCarts, getTotalPrice, clearCart } = useCart();
  const items: CartItem[] = userCarts[userId] || [];

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">(
    "stripe",
  );
  const router = useRouter();

  // Restricted checkout for guests
  if (!user) {
    return (
      <div className="section-container min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 shadow-glow">
          <User size={40} />
        </div>
        <h2 className="text-4xl font-heading font-black text-slate-900 mb-4">
          Registration Required
        </h2>
        <p className="text-slate-500 mb-8 max-w-sm font-medium">
          To keep your orders secure, only registered customers can place
          orders. Please log in to continue.
        </p>
        <div className="flex gap-4">
          <Link href="/login" className="btn-base btn-primary px-12">
            Login Now
          </Link>
          <Link href="/register" className="btn-base btn-outline px-12">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice(userId);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.2;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    toast.success(
      `🎉 Order placed with ${paymentMethod}! Southern Spices is on its way.`,
      {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      },
    );
    // Simulating clear cart and redirect
    setTimeout(() => {
      clearCart(userId);
      logout();
      router.push("/");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="section-container min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-heading font-black text-slate-900 mb-4">
          Wait, Your cart is empty!
        </h2>
        <p className="text-slate-500 mb-8 font-medium">
          Add some authentic Kerala groceries before checking out.
        </p>
        <Link href="/" className="btn-base btn-primary">
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-24 section-container">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Checkout Form Stages */}
        <div className="flex-1 space-y-12">
          {/* Checkout Progress Stepper */}
          <div className="bg-white p-6 rounded-4xl border border-slate-100 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
              <motion.div
                initial={{ width: "33%" }}
                animate={{
                  width: `${step === 1 ? "33" : step === 2 ? "66" : "100"}%`,
                }}
                className="h-full bg-primary"
              />
            </div>

            <div
              className={`flex flex-col items-center gap-2 flex-1 transition-all ${step >= 1 ? "text-primary" : "text-slate-300 font-bold"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${step >= 1 ? "border-primary bg-primary text-white shadow-glow" : "border-slate-100 bg-white"}`}
              >
                1
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
                Information
              </span>
            </div>
            <ChevronRight className="text-slate-200" size={16} />
            <div
              className={`flex flex-col items-center gap-2 flex-1 transition-all ${step >= 2 ? "text-primary" : "text-slate-300 font-bold"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${step >= 2 ? "border-primary bg-primary text-white shadow-glow" : "border-slate-100 bg-white"}`}
              >
                2
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
                Shipping
              </span>
            </div>
            <ChevronRight className="text-slate-200" size={16} />
            <div
              className={`flex flex-col items-center gap-2 flex-1 transition-all ${step >= 3 ? "text-primary" : "text-slate-300 font-bold"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${step >= 3 ? "border-primary bg-primary text-white shadow-glow" : "border-slate-100 bg-white"}`}
              >
                3
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
                Payment
              </span>
            </div>
          </div>

          {/* Dynamic Step Content */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <User size={24} />
                    </div>
                    Customer Information
                  </h2>
                  <p className="text-slate-500 font-medium">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary font-black underline"
                    >
                      Log in
                    </Link>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="User name"
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="username@example.com"
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 XXXX XXXXXX"
                      className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="btn-base btn-primary !py-4 w-full sm:w-auto px-12 mt-4 shadow-glow flex items-center justify-center gap-3 group"
                >
                  Continue to Shipping{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <Truck size={24} />
                    </div>
                    Shipping Method
                  </h2>
                  <p className="text-slate-500 font-medium">
                    Select how you'd like your Southern Spices delivered.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="relative flex items-center gap-6 p-8 rounded-4xl border-2 border-primary bg-primary/5 cursor-pointer group shadow-sm">
                    <input
                      type="radio"
                      name="shipping"
                      checked
                      className="hidden"
                    />
                    <div className="w-6 h-6 rounded-full border-4 border-primary flex items-center justify-center bg-white">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-heading font-black text-slate-900 text-lg">
                        Standard UK Delivery
                      </div>
                      <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                        3-5 Business Days
                      </div>
                    </div>
                    <div className="text-xl font-heading font-black text-primary">
                      £5.99
                    </div>
                    {shipping === 0 && (
                      <div className="absolute top-0 right-10 translate-y-[-50%] bg-success text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-glow">
                        FREE FOR YOU
                      </div>
                    )}
                  </label>

                  <label className="relative flex items-center gap-6 p-8 rounded-4xl border-2 border-slate-50 bg-white hover:border-slate-100 cursor-pointer group transition-all">
                    <input type="radio" name="shipping" className="hidden" />
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 bg-white" />
                    <div className="flex-1">
                      <div className="font-heading font-black text-slate-900 text-lg">
                        Next Day Express
                      </div>
                      <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                        Order by 2pm for tomorrow
                      </div>
                    </div>
                    <div className="text-xl font-heading font-black text-slate-400">
                      £9.99
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-base btn-outline !rounded-2xl !py-4 px-8 flex items-center gap-2 font-bold text-slate-400 active:scale-95 transition-all"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-base btn-primary !py-4 flex-1 shadow-glow active:scale-95 transition-all"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <CreditCard size={24} />
                    </div>
                    Secure Payment
                  </h2>
                  <p className="text-slate-500 font-medium">
                    Select your preferred payment method.
                  </p>
                </div>

                {/* Method Selector Selector */}
                <div className="grid grid-cols-2 gap-6">
                  <button
                    onClick={() => setPaymentMethod("stripe")}
                    className={`flex flex-col items-center gap-4 p-8 rounded-4xl border-2 transition-all ${paymentMethod === "stripe" ? "border-primary bg-primary/5 shadow-premium" : "border-slate-50 bg-white hover:border-slate-100 opacity-60"}`}
                  >
                    <img
                      src="/stripe.png"
                      alt="Stripe"
                      className="h-8 object-contain"
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Pay with Card
                    </span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex flex-col items-center gap-4 p-8 rounded-4xl border-2 transition-all ${paymentMethod === "paypal" ? "border-[#0070ba] bg-[#0070ba]/5 shadow-premium" : "border-slate-50 bg-white hover:border-slate-100 opacity-60"}`}
                  >
                    <img
                      src="/paypal.png"
                      alt="PayPal"
                      className="h-8 object-contain"
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Fast Checkout
                    </span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {paymentMethod === "stripe" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="bg-slate-900 rounded-5xl p-10 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="flex justify-between items-start relative z-10">
                          <div className="w-16 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl" />
                          <img
                            src="/stripe.png"
                            className="h-6 opacity-30 invert"
                            alt=""
                          />
                        </div>
                        <div className="space-y-6 relative z-10">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="●●●●  ●●●●  ●●●●  ●●●●"
                              className="w-full bg-slate-800 border-none rounded-2xl px-6 py-4 font-heading font-black text-2xl tracking-widest outline-none text-primary placeholder:opacity-20"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full bg-slate-800 border-none rounded-2xl px-6 py-4 font-heading font-black text-lg outline-none text-white placeholder:opacity-20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="***"
                                className="w-full bg-slate-800 border-none rounded-2xl px-6 py-4 font-heading font-black text-lg outline-none text-white placeholder:opacity-20"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-10 bg-[#0070ba]/10 rounded-5xl flex flex-col items-center gap-6 border-2 border-[#0070ba]/20"
                    >
                      <img src="/paypal.png" alt="PayPal" className="h-16" />
                      <div className="text-center group-hover:scale-105 transition-all">
                        <div className="font-heading font-black text-slate-900 text-xl">
                          The smarter way to pay
                        </div>
                        <p className="text-slate-500 font-medium text-sm mt-1">
                          You will be redirected to PayPal to complete your
                          purchase safely.
                        </p>
                      </div>
                      <button
                        onClick={handlePlaceOrder}
                        className="bg-[#ffc439] hover:bg-[#f2ba36] text-[#003087] font-black !py-4 px-16 rounded-full flex items-center gap-3 transition-all active:scale-95 shadow-lg uppercase tracking-widest text-sm"
                      >
                        Pay with PayPal <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-4 bg-success/5 p-6 rounded-3xl border border-success/10 text-success">
                  <ShieldCheck size={28} className="flex-shrink-0" />
                  <div className="text-xs font-bold leading-relaxed italic">
                    The secure processing of your payment details is our #1
                    priority. We do not store your full card information on our
                    servers.
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-base btn-outline !rounded-2xl !py-4 px-8 font-bold text-slate-400 flex items-center gap-2"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                  {paymentMethod === "stripe" && (
                    <button
                      onClick={handlePlaceOrder}
                      className="btn-base btn-primary !py-4 flex-1 shadow-glow group"
                    >
                      Pay £{total.toFixed(2)} with Stripe
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Order Summary Summary (Desktop) */}
        <div className="lg:w-96">
          <div className="sticky top-28 space-y-8">
            <div className="bg-slate-50 border border-slate-100 rounded-5xl p-8 shadow-sm">
              <h3 className="text-xl font-heading font-black text-slate-900 mb-8 border-b pb-4 border-slate-200 uppercase tracking-widest">
                Your Order
              </h3>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 overflow-hidden flex-shrink-0 p-1">
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-slate-900 truncate uppercase mt-1">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-xs font-black text-primary italic">
                          £{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
                <div className="flex justify-between font-bold text-slate-400 tracking-widest text-[10px] uppercase">
                  <span>Subtotal</span>
                  <span className="text-slate-600">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-400 tracking-widest text-[10px] uppercase">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-success" : "text-slate-600"
                    }
                  >
                    {shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-400 tracking-widest text-[10px] uppercase">
                  <span>VAT (20%)</span>
                  <span className="text-slate-600">£{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                  <span className="font-heading font-black text-slate-900 text-lg">
                    Total
                  </span>
                  <div className="text-right">
                    <div className="text-3xl font-heading font-black text-primary leading-none italic">
                      £{total.toFixed(2)}
                    </div>
                    <div className="text-[9px] font-black text-slate-300 uppercase mt-1 tracking-widest">
                      Everything Included
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Joined by{" "}
                <span className="text-slate-900 font-black">2,400+</span>{" "}
                Customers in UK
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}
