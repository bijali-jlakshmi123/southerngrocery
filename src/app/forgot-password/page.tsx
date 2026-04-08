"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    try {
      const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://srv1565389.hstgr.cloud";
      const response = await fetch(
        `${wpUrl}/?rest_route=/simple-jwt-login/v1/users/reset_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            AUTH_KEY: "southernspices2026",
          }),
        }
      );
      // Whether or not it succeeds on WP side, show success to user
      setSubmitted(true);
    } catch (error) {
      setSubmitted(true); // Still show success for security
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-secondary-light rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-primary-light rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-3xl rounded-6xl p-8 md:p-14 border border-white shadow-2xl relative z-10"
      >
        <Link href="/" className="inline-flex justify-center w-full mb-10 group">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Image
              src="/logo.png"
              alt="Southern Spices Logo"
              width={200}
              height={70}
              priority
              className="w-auto h-16 object-contain drop-shadow-sm"
            />
          </motion.div>
        </Link>

        {!submitted ? (
          <>
            <h1 className="text-3xl font-heading font-black text-slate-900 text-center mb-2">
              Forgot <span className="text-primary italic">Password?</span>
            </h1>
            <p className="text-slate-500 text-center text-sm mb-8">
              Enter your email and we will send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2">
                  <Mail size={12} className="text-primary" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="username@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-white/50 focus:border-primary transition-all outline-none font-bold placeholder:text-slate-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full btn-base btn-primary !py-5 shadow-glow active:scale-95 transition-all text-lg group mt-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}{" "}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-primary" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Check Your Email</h2>
            <p className="text-slate-500 text-sm">
              If an account exists for <strong>{email}</strong>, a password reset link has been sent.
            </p>
          </motion.div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
          <Link
            href="/login"
            className="flex items-center gap-2 text-xs font-black text-slate-300 hover:text-primary uppercase tracking-widest transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
