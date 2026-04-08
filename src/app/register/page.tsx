"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  Phone,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!agreedTerms) {
      toast.error("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.name.split(" ")[0],
          last_name: formData.name.split(" ").slice(1).join(" ") || "",
          user_login: formData.email, // FULL EMAIL AS USERNAME
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      console.log("REGISTER RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.data?.message || data.message || "Registration failed",
        );
      }

      toast.success("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);

      toast.error(
        error.message || "Failed to register account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-14 shadow-2xl"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex justify-center w-full mb-8">
            <Image
              src="/logo.png"
              alt="Southern Spices Logo"
              width={250}
              height={80}
              priority
              className="w-auto h-20 object-contain"
            />
          </Link>

          <h1 className="text-4xl font-black text-slate-900">
            Join Southern Spices
          </h1>

          <p className="text-slate-500 mt-3">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-6 py-4 rounded-2xl border"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-6 py-4 rounded-2xl border"
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-6 py-4 rounded-2xl border"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <label className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
            />
            <span>I agree to Terms & Privacy Policy</span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="md:col-span-2 w-full py-4 rounded-2xl bg-primary text-white font-bold"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="text-primary font-bold">
            Already have an account? Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
