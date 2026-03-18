"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Apple,
  ArrowRight,
  User,
  Eye,
  Phone,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAuth } from "@/lib/store";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const wpUrl =
        process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8000";
      const response = await fetch(
        `${wpUrl}/wp-json/simple-jwt-login/v1/auth`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save token to localStorage or handle based on your specific auth strategy
      if (data.data?.jwt) {
        localStorage.setItem("wp_jwt", data.data.jwt);
      }

      setUser({
        id: data.data?.user?.id || "wp_user",
        name: data.data?.user?.display_name || formData.email.split("@")[0],
        email: formData.email,
      });

      toast.success("Successfully logged in! Welcome back.");
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.message ||
          "Failed to authenticate with WordPress. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg bg-white/70 backdrop-blur-3xl rounded-6xl p-10 md:p-14 border border-white shadow-2xl relative z-10"
      >
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block mb-8 hover:scale-105 transition-transform"
          >
            <Image
              src="/logo.png"
              alt="Southern Spices"
              width={180}
              height={60}
              className="h-12 w-auto object-contain mx-auto"
            />
          </Link>
          <h1 className="text-4xl font-heading font-black text-slate-900 leading-tight">
            Welcome <span className="text-primary italic">Back</span>
          </h1>
          <p className="text-slate-500 font-medium mt-3">
            Log in to your account to continue shopping.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2">
              <Mail size={12} className="text-primary" /> Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="username@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-white/50 focus:border-primary transition-all outline-none font-bold placeholder:text-slate-300"
              required
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2">
              <Lock size={12} className="text-primary" /> Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-white/50 focus:border-primary transition-all outline-none font-bold placeholder:text-slate-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
              >
                <Eye size={20} />
              </button>
            </div>
            <div className="text-right mt-2">
              <Link
                href="/forgot-password"
                className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`btn-base btn-primary !py-5 w-full shadow-glow active:scale-95 transition-all text-lg group ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Processing..." : "Sign In"}{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>

        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300 tracking-[0.3em] bg-transparent">
            <span className="bg-white/70 px-4">Or Connect With</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 bg-white rounded-2xl hover:border-slate-100 font-bold active:scale-95 transition-all">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4"
            />{" "}
            Google
          </button>
          <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 bg-white rounded-2xl hover:border-slate-100 font-bold active:scale-95 transition-all">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              className="w-4 h-4"
            />{" "}
            Apple
          </button>
        </div>

        <p className="mt-12 text-center text-slate-500 font-medium">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-black underline underline-offset-4 decoration-2"
          >
            Create Account
          </Link>
        </p>

        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-black text-slate-300 hover:text-secondary uppercase tracking-widest transition-colors group"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Back to Southern Spices
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
