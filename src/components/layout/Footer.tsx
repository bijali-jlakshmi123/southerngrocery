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
  Send,
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
    <>
      {/* NEWSLETTER FULL WIDTH */}
      <div className="bg-primary py-12 w-full">
        <div className="max-w-8xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/10 p-4 rounded-xl">
              <Send size={30} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                Join Our Newsletter For £10 Off
              </h3>
              <p className="opacity-80 text-sm">
                Subscribe to get updates on new offers & products
              </p>
            </div>
          </div>

          <div className="w-full max-w-xl">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-6 py-4 rounded-xl bg-white outline-none text-secondary"
              />
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:scale-105 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <footer className="bg-white pt-24 pb-12 text-slate-600 relative border-t border-slate-100 w-full overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-8xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-20 text-center md:text-left">
            {/* Logo */}
            <div className="lg:col-span-2 space-y-8">
              <Link href="/" className="flex items-center gap-2">
                <motion.div>
                  {/*whileHover={{ scale: 1.05 }}>*/}
                  <Image
                    src="/logo.png"
                    alt="Southern Spices"
                    width={220}
                    height={60}
                  />
                </motion.div>
              </Link>

              <p className="text-slate-500 max-w-sm mx-auto md:mx-0">
                UK's premier online destination for authentic Kerala groceries.
              </p>

              <div className="flex justify-center md:justify-start gap-4">
                {[Facebook, Instagram, Twitter, MessageCircle].map(
                  (Icon, i) => (
                    <motion.div key={i} whileHover={{ y: -5 }}>
                      <Link
                        href="#"
                        className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center hover:shadow-lg border"
                      >
                        <Icon size={20} />
                      </Link>
                    </motion.div>
                  ),
                )}
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-slate-900 font-black uppercase tracking-widest">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="hover:text-primary flex items-center gap-1 justify-center md:justify-start"
                      >
                        {link.name}
                        <ArrowUpRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CONTACT STRIP */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-y mb-12 bg-slate-50 rounded-3xl px-8">
            <div className="flex gap-4">
              <Phone />
              <span>+44 XXXX XXXXXX</span>
            </div>
            <div className="flex gap-4">
              <MessageCircle />
              <span>Chat Now</span>
            </div>
            <div className="flex gap-4">
              <MapPin />
              <span>Southern Spices UK HQ</span>
            </div>
            <div className="flex gap-4">
              <Mail />
              <span>support@southernspices.co.uk</span>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              © {currentYear} Southern Spices
            </p>

            <div className="flex gap-4 text-xs font-bold">
              <span>VISA</span>
              <span>MASTERCARD</span>
              <span>AMEX</span>
              <span>APPLE PAY</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
