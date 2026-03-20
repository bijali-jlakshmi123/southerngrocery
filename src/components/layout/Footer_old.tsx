"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  Twitter,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Weekly Offers", href: "/offers" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Store Address", href: "/contact" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Rice & Grains", href: "/category/rice" },
        { name: "Spices & Masala", href: "/category/spices" },
        { name: "Oils & Ghee", href: "/category/oils" },
        { name: "Kerala Snacks", href: "/category/snacks" },
        { name: "Frozen Foods", href: "/category/frozen" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Delivery Info", href: "/shipping" },
        { name: "My Account", href: "/login" },
        { name: "Shopping Basket", href: "/cart" },
        { name: "Contact & Support", href: "/contact" },
        { name: "Store Address", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-white pt-24 pb-12 text-slate-600 overflow-hidden relative border-t border-slate-100">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-20 text-center md:text-left">
          {/* Logo & Info */}
          <div className="lg:col-span-2 space-y-8">
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
                  className="object-contain"
                />
              </motion.div>
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
              UK's premier online destination for authentic Kerala and Indian
              groceries. Bringing the taste of home to your doorstep with
              quality and care.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {[
                { Icon: Facebook, color: "text-blue-600" },
                { Icon: Instagram, color: "text-pink-600" },
                { Icon: Twitter, color: "text-blue-400" },
                { Icon: MessageCircle, color: "text-green-500" },
              ].map(({ Icon, color }, i) => (
                <motion.div key={i} whileHover={{ y: -5, scale: 1.1 }}>
                  <Link
                    href="#"
                    className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-white hover:shadow-premium transition-all border border-slate-100 ${color}`}
                  >
                    <Icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dynamic Link Groups */}
          {footerLinks.map((group, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-slate-900 font-heading font-black text-lg uppercase tracking-widest">
                {group.title}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors flex items-center gap-1 group justify-center md:justify-start font-medium"
                    >
                      {link.name}{" "}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-primary"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-slate-100 mb-12 bg-slate-50/50 rounded-3xl px-8">
          <div className="flex items-center gap-5 justify-center md:justify-start group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
              <Phone size={24} />
            </div>
            <div className="text-left">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                Call Us
              </div>
              <div className="text-slate-900 font-bold">+44 XXXX XXXXXX</div>
            </div>
          </div>
          <div className="flex items-center gap-5 justify-center md:justify-start group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-success shadow-sm border border-slate-100 group-hover:bg-success group-hover:text-white transition-all">
              <MessageCircle size={24} />
            </div>
            <div className="text-left">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                WhatsApp Order
              </div>
              <div className="text-slate-900 font-bold">Chat Now</div>
            </div>
          </div>
          <div className="flex items-center gap-5 justify-center md:justify-start group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all">
              <MapPin size={24} />
            </div>
            <div className="text-left">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                Store Address
              </div>
              <div className="text-slate-900 font-bold max-w-[140px]">
                Unit X, Southern Spices UK HQ
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 justify-center md:justify-start group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm border border-slate-100 group-hover:bg-accent group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <div className="text-left">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                Email Support
              </div>
              <div className="text-slate-900 font-bold">
                support@southernspices.co.uk
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-4">
          <div
            className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
            suppressHydrationWarning
          >
            &copy; {currentYear}{" "}
            <span className="text-primary">Southern Spices</span>. All Rights
            Reserved.
          </div>
          <div className="flex gap-6 items-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-[10px] font-black tracking-widest text-slate-400">
              VISA
            </span>
            <span className="text-[10px] font-black tracking-widest text-slate-400">
              MASTERCARD
            </span>
            <span className="text-[10px] font-black tracking-widest text-slate-400">
              AMEX
            </span>
            <span className="text-[10px] font-black tracking-widest text-slate-400">
              APPLE PAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
