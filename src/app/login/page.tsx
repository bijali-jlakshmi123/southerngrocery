"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Eye, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAuth, useCart } from "@/lib/store";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);
  const { mergeCarts } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.data?.message || data.message || "Invalid credentials",
        );
      }

      // Save JWT token
      if (data.data?.jwt) {
        localStorage.setItem("wp_jwt", data.data.jwt);
      }

      // Save user to store
      const loggedInUser = {
        id: data.data?.user?.id?.toString() || "wp_user",
        name: data.data?.user?.display_name || formData.email.split("@")[0],
        email: formData.email,
      };
      
      setUser(loggedInUser);

      // Merge Guest Cart to User Cart
      mergeCarts("guest", loggedInUser.id);

      toast.success("Successfully logged in!");

      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (error: any) {
      console.error("Login error:", error);

      toast.error(error.message || "Failed to authenticate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary rounded-full blur-[120px]"
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg bg-white rounded-3xl p-10 shadow-2xl"
      >
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex justify-center w-full mb-10">
            <Image
              src="/logo.png"
              alt="Southern Spices Logo"
              width={250}
              height={80}
              priority
              className="w-auto h-20 object-contain"
            />
          </Link>

          <h1 className="text-4xl font-black text-slate-900">Welcome Back</h1>

          <p className="text-slate-500 mt-3">Log in to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="email"
            type="email"
            placeholder="username@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-6 py-4 rounded-2xl border"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-2xl border"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <Eye size={20} />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-primary text-white font-bold"
          >
            {isLoading ? "Processing..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/register" className="text-primary font-bold">
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
