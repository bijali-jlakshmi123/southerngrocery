import {
  Tag,
  Timer,
  Flame,
  Sparkles,
  Percent,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { getProducts } from "@/lib/woocommerce";
import { mapWcProduct } from "@/lib/utils";
import CountdownTrigger from "./CountdownTrigger";

export default async function OffersPage() {
  const [onSaleProducts, featuredProducts] = await Promise.all([
    getProducts({ on_sale: true, per_page: 20 }),
    getProducts({ per_page: 3, orderby: "popularity" }),
  ]);

  const allOffers = onSaleProducts.map(mapWcProduct);
  const featuredDeals = featuredProducts.map((p) => ({
    ...mapWcProduct(p),
    badge: "Limited Offer",
  }));

  // If no on sale products, fallback to some popular ones to avoid empty page
  const displayOffers = allOffers.length > 0 ? allOffers : featuredDeals;

  return (
    <div className="min-h-screen pt-12 pb-24">
      {/* Hero Banner Section */}
      <div className="section-container mb-24">
        <div className="relative rounded-6xl overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/5 p-12 md:p-20 border border-secondary/10 shadow-sm">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary/5 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-glow">
                <Percent size={14} /> Weekly Super Deals
              </div>
              <h1 className="text-6xl lg:text-7xl font-heading font-black text-slate-900 tracking-tight leading-[1.1]">
                Flash <span className="text-secondary italic">Offers</span>{" "}
                <br /> Ending Soon!
              </h1>
              <p className="max-w-md text-slate-500 font-medium text-lg leading-relaxed">
                Grab your Kerala essentials at unbeatable prices. Limited stock
                available on all discounted items.
              </p>

              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <div className="bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Ends In
                  </div>
                  <CountdownTrigger />
                </div>
                <div className="bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Max Discount
                  </div>
                  <div className="text-3xl font-heading font-black text-primary">
                    UP TO 40%
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-sm aspect-square">
              <div className="absolute inset-0 border-2 border-dashed border-secondary/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-8 bg-white rounded-full shadow-2xl flex items-center justify-center p-8 overflow-hidden group">
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary text-white rounded-full flex flex-col items-center justify-center font-heading font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  <span className="text-3xl">HOT</span>
                  <span className="text-[10px] opacity-75">UK DELIVERY</span>
                </div>
                <img
                  src={featuredDeals[0]?.image || "/matta_rice_new.png"}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  alt="Flash Deal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Hot Deals Grid */}
      <div className="section-container mb-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
            <Flame size={24} />
          </div>
          <h2 className="text-3xl font-heading font-black text-slate-900">
            Featured <span className="text-secondary">Hot Picks</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDeals.map((deal) => (
            <div key={deal.id} className="relative group">
              <div className="absolute -top-3 left-6 z-20 bg-secondary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg scale-110 group-hover:scale-125 transition-transform uppercase tracking-widest">
                {deal.badge}
              </div>
              <ProductCard {...deal} />
            </div>
          ))}
        </div>
      </div>

      {/* All Member Offers */}
      <div className="section-container">
        <div className="flex items-center justify-between mb-12 border-b pb-8 border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Tag size={24} />
            </div>
            <h2 className="text-3xl font-heading font-black text-slate-900">
              All Member <span className="text-primary">Offers</span>
            </h2>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Showing {displayOffers.length} additional deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayOffers.map((deal) => (
            <ProductCard key={deal.id} {...deal} />
          ))}
        </div>

        {/* Trust strip in offers */}
        <div className="mt-24 bg-slate-50 rounded-5xl p-12 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-premium border border-slate-50 text-success">
            <Sparkles size={40} />
          </div>
          <h3 className="text-2xl font-heading font-black text-slate-900">
            New Deals Every Monday!
          </h3>
          <p className="max-w-md text-slate-500 font-medium">
            Don't see your favourite item? Follow our daily stories or sign up
            for UK-wide delivery notifications.
          </p>
          <button className="btn-base btn-primary !rounded-2xl shadow-glow flex items-center gap-2 group">
            Shop Exclusive Packs{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
