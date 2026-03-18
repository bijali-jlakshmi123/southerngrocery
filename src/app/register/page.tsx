'use client';

import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, Phone, ChevronLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (!agreedTerms) {
      toast.error('You must agree to the Terms and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call API call
    setTimeout(() => {
      setIsLoading(true); // Still "loading" for toast feedback
      toast.success('Account created successfully! Redirecting...');
      setTimeout(() => {
        setIsLoading(false);
        router.push('/login');
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
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
        className="w-full max-w-2xl bg-white/70 backdrop-blur-3xl rounded-6xl p-8 md:p-14 border border-white shadow-2xl relative z-10 grid md:grid-cols-12 gap-12"
      >
        <div className="md:col-span-full text-center">
           <Link href="/" className="inline-block mb-10 hover:scale-110 transition-transform">
              <Image src="/logo.png" alt="Southern Spices" width={180} height={60} className="h-12 w-auto object-contain mx-auto" />
           </Link>
           <h1 className="text-4xl font-heading font-black text-slate-900 leading-tight">Join <span className="text-primary italic">Southern Spices</span></h1>
           <p className="text-slate-500 font-medium mt-3">Experience Kerala's authentic flavours delivered to your door.</p>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-full grid md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2">
              <User size={12} className="text-primary" /> Full Name
            </label>
            <input 
              name="name"
              type="text" 
              placeholder="Ajai Ram"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-white/50 focus:border-primary transition-all outline-none font-bold placeholder:text-slate-300" 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2">
              <Mail size={12} className="text-primary" /> Email Address
            </label>
            <input 
              name="email"
              type="email" 
              placeholder="ajairam@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 bg-white/50 focus:border-primary transition-all outline-none font-bold placeholder:text-slate-300" 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2">
              <Phone size={12} className="text-primary" /> Phone Number
            </label>
            <input 
              name="phone"
              type="tel" 
              placeholder="+44 XXXX XXXXXX"
              value={formData.phone}
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
          </div>

          <div className="md:col-span-full pt-4">
             <label className="flex items-start gap-4 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-primary transition-all outline-none shadow-sm" 
                />
                <span className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest group-hover:text-primary transition-colors">
                  I agree to the <Link href="/terms" className="text-primary underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>
                </span>
             </label>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`md:col-span-full btn-base btn-primary !py-5 shadow-glow active:scale-95 transition-all text-lg group mt-6 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
             {isLoading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="md:col-span-full relative my-8">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
           <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300 tracking-[0.3em] bg-transparent">
              <span className="bg-white/70 px-4">Already a member?</span>
           </div>
        </div>

        <div className="md:col-span-full text-center">
           <Link href="/login" className="btn-base btn-outline !rounded-3xl !py-4 w-full md:w-auto px-12 font-black text-slate-400 hover:text-primary active:scale-95 transition-all">
              Sign In to Your Account
           </Link>
        </div>

        <div className="md:col-span-full mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <Link href="/" className="flex items-center gap-2 text-xs font-black text-slate-300 hover:text-secondary uppercase tracking-widest transition-colors group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back Home
           </Link>
           <div className="flex items-center gap-2 text-[10px] font-black text-success uppercase tracking-widest opacity-60">
              <ShieldCheck size={14} /> SSL SECURED 256-BIT
           </div>
        </div>
      </motion.div>
    </div>
  );
}
