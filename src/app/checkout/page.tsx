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
  const { user } = useAuth();
  const userId = user?.id || "guest";
  const { userCarts, getTotalPrice, clearCart } = useCart();
  const items: CartItem[] = userCarts[userId] || [];

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    address1: "",
    city: "",
    state: "",
    postcode: "",
    country: "GB",
  });

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "bacs">(
    "stripe",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          <Link href="/login?redirect=/checkout" className="btn-base btn-primary px-12">
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

  const validateStep1 = () => {
    const required = ["firstName", "lastName", "email", "address1", "city", "postcode", "phone"];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    setIsProcessing(true);

    try {
      const numericUserId = user?.id ? parseInt(user.id) : 0;
      
      const methodTitles = {
        stripe: "Credit Card (Stripe)",
        paypal: "PayPal",
        bacs: "Direct Bank Transfer"
      };

      const orderData: any = {
        payment_method: paymentMethod,
        payment_method_title: methodTitles[paymentMethod],
        set_paid: paymentMethod !== "bacs",
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address1,
          city: formData.city,
          state: formData.state || formData.city,
          postcode: formData.postcode,
          country: formData.country,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address1,
          city: formData.city,
          state: formData.state || formData.city,
          postcode: formData.postcode,
          country: formData.country,
        },
        line_items: items.map((item) => ({
          product_id: parseInt(item.id.toString()),
          quantity: item.quantity,
        })),
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Standard Shipping",
            total: shipping.toFixed(2),
          },
        ],
      };

      if (!isNaN(numericUserId) && numericUserId > 0) {
        orderData.customer_id = numericUserId;
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      let result: any;
      const text = await response.text();
      
      try {
        result = JSON.parse(text);
      } catch (e) {
        result = { success: false, error: `Server Error (${response.status}). The server returned an invalid response.` };
      }

      if (result.success) {
        toast.success(`🎉 Order placed successfully!`, { position: "top-center" });
        clearCart(userId);
        router.push(`/checkout/success?id=${result.data.id}`);
      } else {
        let errorMsg = result.error || "Unknown error";
        if (typeof errorMsg === "string" && errorMsg.includes("not allowed to create resources")) {
          errorMsg = "API Permission Error: Your keys are active but the server is blocking orders. Ensure your keys have 'Read/Write' access and no security plugins are blocking the request.";
        }
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error("Checkout Error:", error);
      toast.error(error.message || "An error occurred while placing your order.");
      setIsProcessing(false);
    }
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
        <div className="flex-1 space-y-12">
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

            <div className={`flex flex-col items-center gap-2 flex-1 transition-all ${step >= 1 ? "text-primary" : "text-slate-300 font-bold"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${step >= 1 ? "border-primary bg-primary text-white shadow-glow" : "border-slate-100 bg-white"}`}>1</div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Address</span>
            </div>
            <ChevronRight className="text-slate-200" size={16} />
            <div className={`flex flex-col items-center gap-2 flex-1 transition-all ${step >= 2 ? "text-primary" : "text-slate-300 font-bold"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${step >= 2 ? "border-primary bg-primary text-white shadow-glow" : "border-slate-100 bg-white"}`}>2</div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Shipping</span>
            </div>
            <ChevronRight className="text-slate-200" size={16} />
            <div className={`flex flex-col items-center gap-2 flex-1 transition-all ${step >= 3 ? "text-primary" : "text-slate-300 font-bold"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${step >= 3 ? "border-primary bg-primary text-white shadow-glow" : "border-slate-100 bg-white"}`}>3</div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Payment</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <MapPin size={24} />
                    </div>
                    Shipping Address
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">First Name</label>
                    <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Last Name</label>
                    <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Street Address</label>
                    <input name="address1" type="text" placeholder="e.g. 123 High Street" value={formData.address1} onChange={handleInputChange} className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">City</label>
                    <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">County / State</label>
                    <input name="state" type="text" placeholder="e.g. London" value={formData.state} onChange={handleInputChange} className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Postcode</label>
                    <input name="postcode" type="text" placeholder="Postcode" value={formData.postcode} onChange={handleInputChange} className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                    <input name="phone" type="tel" placeholder="For delivery updates" value={formData.phone} onChange={handleInputChange} className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold" />
                  </div>
                </div>

                <button onClick={() => { if (validateStep1()) setStep(2); }} className="btn-base btn-primary !py-4 w-full sm:w-auto px-12 mt-4 shadow-glow flex items-center justify-center gap-3 group">
                  Continue to Shipping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <Truck size={24} />
                    </div>
                    Shipping Method
                  </h2>
                </div>

                <div className="space-y-4">
                  <label className="relative flex items-center gap-6 p-8 rounded-4xl border-2 border-primary bg-primary/5 cursor-pointer group shadow-sm">
                    <input type="radio" name="shipping" defaultChecked className="hidden" />
                    <div className="w-6 h-6 rounded-full border-4 border-primary flex items-center justify-center bg-white">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-heading font-black text-slate-900 text-lg">Standard Delivery</div>
                      <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">3-5 Business Days</div>
                    </div>
                    <div className="text-xl font-heading font-black text-primary">£{shipping.toFixed(2)}</div>
                  </label>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="btn-base btn-outline !rounded-2xl !py-4 px-8 flex items-center gap-2 font-bold text-slate-400">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn-base btn-primary !py-4 flex-1 shadow-glow">Proceed to Payment</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-black text-slate-900 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <CreditCard size={24} />
                    </div>
                    Secure Payment
                  </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  <button onClick={() => setPaymentMethod("stripe")} className={`flex flex-col items-center gap-4 p-8 rounded-4xl border-2 transition-all ${paymentMethod === "stripe" ? "border-primary bg-primary/5 shadow-premium" : "border-slate-50 bg-white hover:border-slate-100 opacity-60"}`}>
                    <CreditCard size={32} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Stripe / Card</span>
                  </button>
                  <button onClick={() => setPaymentMethod("paypal")} className={`flex flex-col items-center gap-4 p-8 rounded-4xl border-2 transition-all ${paymentMethod === "paypal" ? "border-[#0070ba] bg-[#0070ba]/5 shadow-premium" : "border-slate-50 bg-white hover:border-slate-100 opacity-60"}`}>
                    <div className="font-heading font-black text-xl text-[#0070ba]">PayPal</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">PayPal</span>
                  </button>
                  <button onClick={() => setPaymentMethod("bacs")} className={`flex flex-col items-center gap-4 p-8 rounded-4xl border-2 transition-all ${paymentMethod === "bacs" ? "border-secondary bg-secondary/5 shadow-premium" : "border-slate-50 bg-white hover:border-slate-100 opacity-60"}`}>
                    <Truck size={32} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Bank Transfer</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 bg-success/5 p-6 rounded-3xl border border-success/10 text-success">
                  <ShieldCheck size={28} className="flex-shrink-0" />
                  <div className="text-xs font-bold leading-relaxed italic text-left">
                    The secure processing of your payment details is our #1 priority. We do not store your full card information on our servers.
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <button onClick={() => setStep(2)} className="btn-base btn-outline !rounded-2xl !py-4 px-8 font-bold text-slate-400 flex items-center gap-2">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={isProcessing} className="btn-base btn-primary !py-4 flex-1 shadow-glow group disabled:opacity-50">
                    {isProcessing ? "Processing..." : `Pay £${total.toFixed(2)} & Place Order`}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:w-96">
          <div className="sticky top-28 space-y-8">
            <div className="bg-slate-50 border border-slate-100 rounded-5xl p-8 shadow-sm">
              <h3 className="text-xl font-heading font-black text-slate-900 mb-8 border-b pb-4 border-slate-200 uppercase tracking-widest">Your Order</h3>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 overflow-hidden flex-shrink-0 p-1">
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image src={(item.imageUrl && item.imageUrl !== 'image') ? item.imageUrl : "/placeholder.png"} alt={item.name} fill className="object-cover" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-slate-900 truncate uppercase mt-1">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider">Qty: {item.quantity}</span>
                        <span className="text-xs font-black text-primary italic">£{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
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
                  <span className={shipping === 0 ? "text-success" : "text-slate-600"}>{shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-400 tracking-widest text-[10px] uppercase">
                  <span>VAT (20%)</span>
                  <span className="text-slate-600">£{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                  <span className="font-heading font-black text-slate-900 text-lg">Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-heading font-black text-primary leading-none italic">£{total.toFixed(2)}</div>
                    <div className="text-[9px] font-black text-slate-300 uppercase mt-1 tracking-widest">Everything Included</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}
