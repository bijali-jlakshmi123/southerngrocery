import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ChevronLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">
            Welcome to Southern Spices. By using our website and services, you agree to be bound by the following terms and conditions.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of the Service</h2>
          <p className="mb-4">You must be at least 18 years old to use this service. You are responsible for maintaining the confidentiality of your account information.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Product Information</h2>
          <p className="mb-4">We strive to provide accurate descriptions of our spices and products. However, we do not warrant that product descriptions or other content are error-free.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Shipping and Delivery</h2>
          <p className="mb-4">Delivery times are estimates and may vary based on your location in the UK.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
          <p className="mb-4">Southern Spices shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our products.</p>
        </div>
      </div>
    </div>
  );
}
