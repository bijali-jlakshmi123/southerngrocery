"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "📨 Thank you! Your message has been sent. We will get back to you shortly.",
      {
        position: "bottom-right",
        theme: "colored",
      },
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Call Support",
      value: "+44 XXXX XXXXXX",
      subtitle: "Mon-Sat, 9AM-6PM",
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      value: "hello@southernspices.uk",
      subtitle: "Reply within 24h",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "WhatsApp",
      value: "Chat Now",
      subtitle: "Instant Support",
      link: "https://wa.me/XXXXXXXXXX",
    },
    {
      icon: <MapPin size={24} />,
      title: "Main Depot",
      value: "London, UK",
      subtitle: "Serving UK-wide",
    },
  ];

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="section-container">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/5 text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <MessageSquare size={14} /> Get in Touch
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
            We're Here for{" "}
            <span className="text-secondary italic">Your Spices</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Have a question about a product or need help with your delivery? Our
            team of Kerala grocery experts is ready to help you.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Info Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-4xl border border-slate-50 shadow-sm hover:shadow-premium transition-all group flex items-start gap-6"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                      {info.title}
                    </div>
                    <div className="text-lg font-heading font-black text-slate-900 truncate">
                      {info.value}
                    </div>
                    <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter opacity-60">
                      {info.subtitle}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials Connection Connection */}
            <div className="bg-slate-900 rounded-5xl p-10 text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-3xl" />
              <h3 className="text-2xl font-heading font-black relative z-10">
                Follow Our Spice Journey
              </h3>
              <div className="flex gap-4 relative z-10">
                {[Instagram, Facebook, Twitter].map((Social, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
                  >
                    <Social size={20} />
                  </button>
                ))}
              </div>
              <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Join 15k+ followers
                </span>
              </div>
            </div>
          </div>

          {/* Right: Modern Modern Form Form */}
          <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-5xl border border-slate-50 shadow-premium relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-4">
                    Full Name
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="User Name"
                    type="text"
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-4">
                    Email Address
                  </label>
                  <input
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="username@example.com"
                    type="email"
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-4">
                  Message Subject
                </label>
                <input
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Bulk Order Query"
                  type="text"
                  className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-4">
                  Tell Us More
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Write your message here..."
                  className="w-full px-8 py-6 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300 resize-none"
                />
              </div>

              <button className="btn-base btn-primary !py-5 w-full shadow-glow group overflow-hidden relative">
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg font-black tracking-widest text-white">
                  Send Message{" "}
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Preview Section Preview Section */}
        <div className="mt-32 pt-24 border-t border-slate-100">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-black text-slate-900 mb-4">
              Quick <span className="text-primary">Answers</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              Commonly asked questions in the spice community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                q: "Where do you deliver?",
                a: "We deliver across the entire UK, including major cities like London, Manchester, Birmingham, and Edinburgh.",
              },
              {
                q: "How long does shipping take?",
                a: "Most orders are dispatched within 24 hours. Standard delivery typically takes 3-5 business days.",
              },
              {
                q: "Are your vegetables fresh?",
                a: "Yes! Our vegetables are sourced daily to ensure you receive only the freshest quality authentic Kerala produce.",
              },
              {
                q: "Do you offer bulk discounts?",
                a: "We certainly do! Please contact us using the form above for bulk order quotes.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 p-8 rounded-4xl border border-transparent hover:border-slate-100 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-secondary group-hover:scale-110 transition-transform">
                    <ChevronRight size={20} className="font-bold" />
                  </div>
                  <h4 className="text-lg font-heading font-black text-slate-900">
                    {faq.q}
                  </h4>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed pl-9">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
