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
  ChevronDown,
  ChevronRight,
  Wheat,
  Package,
  Droplet,
  Snowflake,
  Cookie,
  Apple,
  Shrub,
  Waves,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { useCart, useAuth, useWishlist } from "@/lib/store";

interface HeaderProps {
  categories?: any[];
}

export default function Header({ categories: dynamicCategories }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const router = useRouter();

  const { user, logout } = useAuth();
  const getTotalItems = useCart((state) => state.getTotalItems);

  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = dynamicCategories?.length ? dynamicCategories.map(c => ({
    name: c.name,
    icon: <Package size={18} />,
    href: `/category/${c.slug}`,
  })) : [
    {
      name: "Rice & Grains",
      icon: <Waves size={18} />,
      href: "/category/rice",
    },
    {
      name: "Atta & Flour",
      icon: <Wheat size={18} />,
      href: "/category/atta",
    },
    { name: "Pulses", icon: <Package size={18} />, href: "/category/pulses" },
    {
      name: "Oils & Ghee",
      icon: <Droplet size={18} />,
      href: "/category/oils",
    },
    {
      name: "Frozen Foods",
      icon: <Snowflake size={18} />,
      href: "/category/frozen",
    },
    { name: "Snacks", icon: <Cookie size={18} />, href: "/category/snacks" },
    { name: "Pickles", icon: <Shrub size={18} />, href: "/category/pickles" },
    {
      name: "Fresh Vegetables",
      icon: <Apple size={18} />,
      href: "/category/vegetables",
    },
  ];

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
      {/* Top Bar */}
      <div className="bg-[#f2f2f2] text-secondary py-1.5 text-xs border-b border-gray-200 min-h-[40px] flex items-center">
        <div className="max-w-8xl mx-auto px-6 flex justify-between items-center w-full">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone size={14} className="text-primary" /> +44 XXXX XXXXXX
            </span>
            <span className="hidden sm:flex items-center gap-1.5 opacity-90">
              <MapPin size={14} className="text-primary" /> Kerala Store Across
              UK
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <Link
              href="https://wa.me/XXXXXXXXXX"
              className="flex items-center gap-1.5 hover:text-primary transition-colors group"
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
                <span className="text-primary font-bold">
                  {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={() => logout()}
                  className="text-secondary/60 hover:text-primary transition-colors uppercase tracking-widest text-[10px]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 hover:text-primary transition-colors group"
              >
                <User size={14} /> My Account
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
            ? "bg-white/90 backdrop-blur-md py-2 shadow-sm border-gray-100"
            : "bg-white py-4 border-transparent",
        )}
      >
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <Image
                src="/logo.png"
                alt="Southern Spices Logo"
                width={180}
                height={50}
                priority
                className="object-contain"
              />
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-2xl hidden lg:flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-14 py-2.5 bg-slate-50 border border-transparent focus:border-primary/20 focus:bg-white rounded-md outline-none transition-all duration-300 font-medium text-slate-600 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-5 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors"
              >
                <Search size={22} />
              </button>
            </form>

            {/* Action Icons */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 sm:p-3 hover:bg-slate-50 rounded-lg lg:hidden text-slate-600"
              >
                <Search size={22} />
              </button>

              <Link
                href="/wishlist"
                className="relative group p-2 hover:bg-slate-50 rounded-lg transition-all hidden sm:block"
              >
                <Heart
                  size={26}
                  className="text-slate-700 group-hover:text-primary transition-colors"
                />
                {mounted &&
                  (useWishlist.getState().userWishlists[user?.id || "guest"]
                    ?.length || 0) > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
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
                className="relative group p-2 hover:bg-slate-50 rounded-lg transition-all"
              >
                <ShoppingCart
                  size={26}
                  className="text-slate-700 group-hover:text-primary transition-colors"
                />
                {mounted && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {getTotalItems(user?.id || "guest")}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 sm:p-3 bg-slate-50 text-slate-600 rounded-lg lg:hidden"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Nav Categories - Desktop Only */}
          <nav className="mt-2 hidden lg:block border-t border-gray-50">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-8 relative"
                ref={categoryMenuRef}
              >
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  className="bg-primary text-white px-6 py-3 font-semibold text-[14px] flex items-center gap-3 uppercase tracking-wider rounded-t-md min-w-[240px]"
                >
                  <Menu size={18} />
                  Shop By Categories
                  <ChevronDown
                    size={16}
                    className={clsx(
                      "ml-auto transition-transform duration-300",
                      isCategoryMenuOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Categories Dropdown */}
                <AnimatePresence>
                  {isCategoryMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 z-[60] py-2 rounded-b-md"
                    >
                      <ul className="flex flex-col">
                        {categories.map((cat) => (
                          <li key={cat.name}>
                            <Link
                              href={cat.href}
                              onClick={() => setIsCategoryMenuOpen(false)}
                              className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors group"
                            >
                              <span className="text-primary/60 group-hover:text-primary transition-colors">
                                {cat.icon}
                              </span>
                              <span className="text-slate-700 font-medium text-sm group-hover:text-primary transition-colors">
                                {cat.name}
                              </span>
                              <ChevronRight
                                size={14}
                                className="ml-auto text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <ul className="flex items-center gap-8 text-[14px] font-normal text-slate-700 tracking-[0.3px]">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={clsx(
                          "hover:text-primary transition-all relative group",
                          link.special && "text-primary font-bold",
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/offers"
                  className="text-primary text-[14px] font-bold uppercase hover:underline"
                >
                  Weekly Offers
                </Link>
              </div>
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
                <li className="border-b border-slate-50 pb-4">
                  <button
                    onClick={() =>
                      setIsMobileCategoriesOpen(!isMobileCategoriesOpen)
                    }
                    className="w-full text-xl font-heading font-bold flex items-center justify-between text-primary"
                  >
                    <span>Shop By Categories</span>
                    <ChevronDown
                      size={20}
                      className={clsx(
                        "transition-transform",
                        isMobileCategoriesOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {isMobileCategoriesOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4 space-y-4 pl-4"
                      >
                        {categories.map((cat) => (
                          <li key={cat.name}>
                            <Link
                              href={cat.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileCategoriesOpen(false);
                              }}
                              className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors py-1"
                            >
                              <span className="text-primary/40">
                                {cat.icon}
                              </span>
                              <span className="text-base font-medium">
                                {cat.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

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
                        <ChevronRight size={20} className="opacity-40" />
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
