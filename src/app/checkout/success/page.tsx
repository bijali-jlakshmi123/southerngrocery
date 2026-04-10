"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Package, Calendar, ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Confetti from "react-confetti";
import { useState } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if (!orderId) {
      // router.push("/"); // If no ID, redirect back
    }
  }, [orderId]);

  return (
    <div className="min-h-screen pt-12 pb-24 section-container flex flex-col items-center justify-center relative overflow-hidden">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
        colors={["#E95D2A", "#F4A261", "#2A9D8F", "#E76F51"]}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[40px] p-10 md:p-16 shadow-premium border border-slate-50 text-center relative z-10"
      >
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center text-success mx-auto mb-8 shadow-glow">
          <CheckCircle2 size={48} />
        </div>

        <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-4 italic">
          Order Confirmed!
        </h1>
        <p className="text-slate-500 font-medium mb-12 text-lg">
          Thank you for your purchase. Your authentic Southern Spices are being prepared for delivery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Package size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Order Number</span>
            </div>
            <div className="text-2xl font-heading font-black text-slate-900 italic">#{orderId || "N/A"}</div>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Calendar size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Estimated Arrival</span>
            </div>
            <div className="text-2xl font-heading font-black text-slate-900 italic">3-5 Days</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/dashboard" className="btn-base btn-primary px-12 !py-4 w-full sm:w-auto shadow-glow group">
            Track Order <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/" className="btn-base btn-outline px-12 !py-4 w-full sm:w-auto text-slate-600 font-bold border-slate-200">
            Continue Shopping
          </Link>
        </div>
      </motion.div>

      <div className="mt-12 text-center text-slate-400 font-medium flex items-center gap-2">
        <ShoppingBag size={18} />
        Place more orders to earn more reward points!
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
