
import Link from 'next/link';
import { 
  ChevronRight, 
  ArrowRight,
  Package,
  ArrowLeft
} from 'lucide-react';
import { getCategories } from '@/lib/woocommerce';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
  const wcCategories = await getCategories({ hide_empty: true, per_page: 100 });
  
  // Map WC categories to our format
  const categories = wcCategories
    .filter(c => c.name !== "Uncategorized")
    .map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        count: c.count,
        image: c.image?.src || "/placeholder.png", // Use real category image if available
    }));

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-white pt-12 pb-20 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -z-10 skew-x-[-12deg] translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-black uppercase tracking-widest mb-12 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-widest mb-6">
              <Package size={16} /> Explore Full Catalog
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 leading-tight mb-8">
              Shop by <span className="text-primary italic">Category</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Discover the finest collection of Kerala and Indian groceries. From everyday staples to traditional delicacies, we bring the taste of home to your UK doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <CategoriesClient categories={categories} />

      {/* Quick Links Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-slate-950 rounded-5xl p-12 lg:p-20 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-3xl rounded-full" />
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                 <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">Can't find what you're looking for?</h2>
                 <p className="text-lg text-slate-400 font-medium leading-relaxed">
                   Looking for a specific brand or item not listed here? Our inventory updates daily with new traditional arrivals.
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 shrink-0 w-full lg:w-auto">
                 <Link href="/contact" className="btn-base btn-primary !py-5 px-12 text-lg">
                    Request an Item <ChevronRight size={20} />
                 </Link>
                 <Link href="/search" className="btn-base bg-white/5 border border-white/10 text-white hover:bg-white/10 !py-5 px-12 text-lg">
                    Try Advanced Search
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
