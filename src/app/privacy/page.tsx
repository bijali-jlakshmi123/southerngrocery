import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ChevronLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">
            At Southern Spices, we value your privacy. This policy explains how we collect and use your personal information.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect your name, email, phone number, and shipping address when you create an account or place an order.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use your information to process orders, improve our services, and communicate with you about your account.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">We implement industry-standard security measures to protect your personal data from unauthorized access.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Sharing</h2>
          <p className="mb-4">We do not sell your personal information to third parties. We only share data with service providers necessary for order fulfillment.</p>
        </div>
      </div>
    </div>
  );
}
