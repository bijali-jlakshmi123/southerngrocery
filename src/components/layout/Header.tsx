"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Search,
  Menu,
  Phone,
  MapPin,
  MessageCircle,
  X,
  User,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { useCart, useAuth, useWishlist } from "@/lib/store";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { user, logout } = useAuth();
  const getTotalItems = useCart((state) => state.getTotalItems);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Rice & Grains", href: "/category/rice" },
    { name: "Spices & Masala", href: "/category/spices" },
    { name: "Oils & Ghee", href: "/category/oils" },
    { name: "Kerala Snacks", href: "/category/snacks" },
    { name: "Frozen Foods", href: "/category/frozen" },
    { name: "Fresh Vegetables", href: "/category/vegetables", special: true },
  ];

  return (
    <>
      {/* Top Bar Bar */}
      <div className="bg-accent text-white py-2 text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone size={14} className="text-primary-light" /> +44 XXXX XXXXXX
            </span>
            <span className="hidden sm:flex items-center gap-1.5 opacity-90">
              <MapPin size={14} className="text-primary-light" /> Fast Delivery
              Across UK
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <Link
              href="https://wa.me/XXXXXXXXXX"
              className="flex items-center gap-1.5 hover:text-primary-light transition-colors group"
            >
              <MessageCircle
                size={14}
                className="group-hover:scale-110 transition-transform"
              />{" "}
              WhatsApp Order
            </Link>
            <span className="opacity-30">|</span>
            {mounted && user ? (
              <div className="flex items-center gap-4">
                <span className="text-primary-light font-bold">
                  Welcome, {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={() => logout()}
                  className="text-white/60 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 hover:underline group"
              >
                <User size={14} /> Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={clsx(
          "sticky top-0 z-50 w-full transition-all duration-500 border-b",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl py-2 shadow-premium border-white/20"
            : "bg-white py-4 border-slate-100",
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/logo.png"
                  alt="Southern Spices Logo"
                  width={220}
                  height={60}
                  priority
                  className="object-contain drop-shadow-sm"
                />
              </motion.div>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-2xl hidden lg:flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search for Matta Rice, Kerala Snacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-14 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-light/30 focus:bg-white rounded-2xl outline-none transition-all duration-300 font-medium text-slate-600 focus:shadow-premium"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:bg-primary-dark transition-colors"
              >
                <Search size={22} />
              </motion.button>
            </form>

            {/* Action Icons */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 sm:p-3 hover:bg-slate-50 rounded-2xl lg:hidden text-slate-600"
              >
                <Search size={24} />
              </button>

              <Link
                href="/wishlist"
                className="relative group p-3 hover:bg-slate-50 rounded-2xl transition-all hidden sm:block"
              >
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Heart
                    size={28}
                    className="text-slate-600 group-hover:text-secondary transition-colors"
                  />
                </motion.div>
                {mounted &&
                  (useWishlist.getState().userWishlists[user?.id || "guest"]
                    ?.length || 0) > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-secondary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm ring-1 ring-secondary/20">
                      {
                        useWishlist.getState().userWishlists[
                          user?.id || "guest"
                        ]?.length
                      }
                    </span>
                  )}
              </Link>

              <Link
                href="/cart"
                className="relative group p-3 hover:bg-slate-50 rounded-2xl transition-all"
              >
                <motion.div whileHover={{ rotate: -15 }}>
                  <ShoppingCart
                    size={28}
                    className="text-slate-600 group-hover:text-primary transition-colors"
                  />
                </motion.div>
                {mounted && (
                  <span className="absolute top-1.5 right-1.5 bg-secondary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm ring-1 ring-secondary/20">
                    {getTotalItems(user?.id || "guest")}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 sm:p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 lg:hidden"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>

          {/* Nav Categories - Desktop Only */}
          <nav className="mt-4 hidden lg:block border-t border-slate-50">
            <div className="flex items-center justify-between py-1">
              <ul className="flex items-center gap-8 py-3 text-[13px] font-bold uppercase tracking-widest text-slate-500">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={clsx(
                        "hover:text-primary transition-all relative group",
                        link.special && "text-success",
                      )}
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Link
                  href="/offers"
                  className="bg-secondary text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-secondary/30 transition-shadow"
                >
                  Weekly Offers
                </Link>
              </motion.div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-heading font-black text-2xl text-primary">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-secondary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search Input */}
              <div className="mb-8">
                <form
                  onSubmit={handleSearch}
                  className="relative flex items-center group"
                >
                  <input
                    type="text"
                    placeholder="Search for spices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-base font-medium outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 p-3 text-slate-400 hover:text-primary transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </form>
              </div>

              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        "text-xl font-heading font-bold flex items-center justify-between group",
                        link.special ? "text-success" : "text-slate-600",
                      )}
                    >
                      {link.name}
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MapPin size={20} className="rotate-90 opacity-40" />
                      </motion.span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-heading font-bold flex items-center justify-between group text-slate-600"
                  >
                    My Wishlist
                    <Heart size={20} className="text-secondary" />
                  </Link>
                </li>
              </ul>

              <div className="mt-12 pt-12 border-t border-slate-100">
                <Link
                  href="/offers"
                  className="w-full btn-base btn-primary mb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Special Offers
                </Link>
                <div className="flex flex-col gap-4 text-sm font-medium text-slate-400 mt-8">
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> +44 XXXX XXXXXX
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} /> WhatsApp Support
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
