"use client";

import { useCart, useAuth, useWishlist } from "@/lib/store";
import {
  ShoppingCart,
  Star,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import FeaturedProducts from "@/components/home/FeaturedProducts";

interface ProductClientProps {
  product: {
    id: number;
    name: string;
    price: number | string;
    regular_price?: string;
    description: string;
    short_description?: string;
    images: { src: string }[];
    categories: { name: string; slug: string; id: number }[];
    slug: string;
    average_rating?: string;
    rating_count?: number;
    stock_status?: string;
    attributes?: { name: string; options: string[] }[];
  };
  relatedProducts?: any[];
}

export default function ProductClient({
  product,
  relatedProducts = [],
}: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addItem } = useCart();
  const { user } = useAuth();
  const { toggleItem, isInWishlist } = useWishlist();

  const price = parseFloat(String(product.price || 0));
  const originalPrice = product.regular_price
    ? parseFloat(String(product.regular_price))
    : price;
  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id, user?.id || "guest");

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: price.toString(),
        images: product.images,
        slug: product.slug,
      },
      quantity,
      user?.id || "guest",
    );

    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  const handleToggleWishlist = () => {
    toggleItem(
      {
        id: product.id,
        name: product.name,
        price: price.toString(),
        imageUrl: product.images[0]?.src || "/placeholder.png",
        slug: product.slug,
      },
      user?.id || "guest",
    );

    if (!inWishlist) {
      toast.info(`${product.name} saved to wishlist!`, {
        position: "bottom-right",
        autoClose: 2000,
        icon: <Heart className="fill-secondary text-secondary" size={16} />,
      });
    }
  };

  const mainCategory = product.categories?.[0]?.name || "Uncategorized";
  const mainCategorySlug = product.categories?.[0]?.slug || "uncategorized";

  // Sanitize description (WooCommerce returns HTML)
  const sanitizedDescription = (product.description || "").replace(
    /<[^>]*>?/gm,
    "",
  );

  return (
    <div className="section-container pt-8 pb-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-12">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${mainCategorySlug}`}
          className="hover:text-primary transition-colors"
        >
          {mainCategory}
        </Link>
        <span>/</span>
        <span className="text-slate-900 line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-24">
        {/* Left: Product Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square bg-slate-50 rounded-5xl overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center group"
          >
            {discount > 0 && (
              <div className="absolute top-8 left-8 bg-secondary text-white text-sm font-black px-4 py-1.5 rounded-full z-10 shadow-lg">
                -{discount}% OFF
              </div>
            )}
            <Image
              src={
                product.images?.[activeImageIndex]?.src &&
                product.images[activeImageIndex].src !== "image"
                  ? product.images[activeImageIndex].src
                  : "/placeholder.png"
              }
              alt={product.name || "Southern Spices Product"}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-700 p-8"
            />
          </motion.div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={img.src || idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? "border-primary shadow-md"
                      : "border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={
                      img.src && img.src !== "image"
                        ? img.src
                        : "/placeholder.png"
                    }
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-2 bg-slate-50"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {mainCategory}
              </span>
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-black text-slate-700">
                  {product.average_rating || "4.8"}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  ({product.rating_count || 0} reviews)
                </span>
              </div>
            </div>
            <h1 className="text-4xl xl:text-5xl font-heading font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              {product.name}
            </h1>
            <div
              className="text-slate-500 font-medium leading-relaxed mb-8 max-w-xl line-clamp-4"
              dangerouslySetInnerHTML={{
                __html: product.short_description || product.description,
              }}
            />
          </div>

          <div className="bg-slate-50 rounded-5xl p-8 mb-10 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-heading font-black text-primary">
                £{price.toFixed(2)}
              </span>
              {originalPrice > price && (
                <span className="text-xl text-slate-300 line-through font-bold">
                  £{originalPrice.toFixed(2)}
                </span>
              )}
              <span className="ml-2 text-success font-black text-xs uppercase tracking-widest">
                {product.stock_status === "instock"
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-xl"
                >
                  <Minus size={18} />
                </button>
                <span className="w-10 text-center font-black text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-xl"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock_status !== "instock"}
                className="flex-1 btn-base btn-primary !py-4 shadow-glow flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} /> Add to Basket
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                  inWishlist
                    ? "bg-secondary border-secondary text-white shadow-lg"
                    : "bg-white border-slate-100 text-slate-300 hover:text-secondary"
                }`}
              >
                <Heart size={24} className={inWishlist ? "fill-white" : ""} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm group">
              <div className="w-8 h-8 bg-success/10 text-success rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-success group-hover:text-white transition-all shadow-sm">
                <CheckCircle2 size={16} />
              </div>
              <span className="text-xs font-bold text-slate-600 truncate">
                Premium Quality Guaranteed
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm group">
              <div className="w-8 h-8 bg-success/10 text-success rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-success group-hover:text-white transition-all shadow-sm">
                <CheckCircle2 size={16} />
              </div>
              <span className="text-xs font-bold text-slate-600 truncate">
                Authentic Kerala Stock
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-10 border-t border-slate-100">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-white group-hover:shadow-lg">
                <Truck size={20} />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">
                  Next Day Delivery Available
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  UK Wide Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h3 className="text-2xl font-heading font-black text-slate-900 mb-8 border-b pb-4">
          Product Description
        </h3>
        <div
          className="prose prose-slate max-w-none text-slate-500 font-medium leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>

      {/* Matching Items */}
      <FeaturedProducts
        title="Matching Finds"
        subtitle="Complete your Kerala feast with these handpicked traditional items."
        category={mainCategorySlug}
        products={relatedProducts.map((rp) => ({
          id: rp.id,
          name: rp.name,
          price: typeof rp.price === "string" ? parseFloat(rp.price) : rp.price,
          originalPrice: rp.regular_price
            ? parseFloat(rp.regular_price)
            : undefined,
          image:
            rp.images?.[0]?.src && rp.images[0].src !== "image"
              ? rp.images[0].src
              : "/placeholder.png",
          category: rp.categories?.[0]?.name || "Uncategorized",
          slug: rp.slug,
        }))}
        accentColor="text-accent"
        bgColor="bg-slate-50/50"
      />
    </div>
  );
}
