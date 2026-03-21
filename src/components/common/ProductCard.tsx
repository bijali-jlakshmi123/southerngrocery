"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart, useAuth, useWishlist } from "@/lib/store";
import { toast } from "react-toastify";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  slug: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  category,
  image,
  slug,
}: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const { user } = useAuth();
  const { toggleItem, isInWishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration safe check
  const inWishlist = mounted ? isInWishlist(id, user?.id || "guest") : false;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id,
        name,
        price: price.toString(),
        images: [{ src: image }],
        slug,
      },
      1,
      user?.id || "guest",
    );

    toast.success(`${name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleItem(
      {
        id,
        name,
        price: price.toString(),
        imageUrl: image,
        slug,
      },
      user?.id || "guest",
    );

    if (!inWishlist) {
      toast.info(`${name} saved to wishlist!`, {
        position: "bottom-right",
        autoClose: 2000,
        icon: <Heart className="fill-secondary text-secondary" size={16} />,
      });
    }
  };

  return (
    <Link href={`/product/${slug}`}>
      <motion.div
        className="group bg-white rounded-md p-[15px] hover:shadow-premium transition-all duration-300 border border-gray-100 flex flex-col h-full relative cursor-pointer"
      >
        <div className="relative aspect-square bg-[#f8f8f8] rounded-md overflow-hidden mb-4 flex items-center justify-center group/img">
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
              {discount}% OFF
            </div>
          )}

          <button
            onClick={handleToggleWishlist}
            className={clsx(
              "absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-all z-10",
              inWishlist
                ? "bg-primary text-white"
                : "bg-white text-gray-400 hover:text-primary",
            )}
          >
            <Heart size={16} className={inWishlist ? "fill-white" : ""} />
          </button>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full relative"
          >
            <Image
              src={image || "/placeholder.png"}
              alt={name}
              fill
              className="object-contain p-4"
            />
          </motion.div>

          <div className="absolute inset-x-2 bottom-2  opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-2 rounded-md font-bold text-[12px] uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
            >
              Add To Cart
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="text-[10px] font-normal text-gray-400 uppercase tracking-tight mb-1">
            {category}
          </div>
          <h3 className="text-[14px] font-normal text-secondary leading-snug mb-2 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="mt-auto flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className={i < 4 ? "fill-[#ffc107] text-[#ffc107]" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-[10px] text-gray-400">(4.8)</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-primary font-bold text-[18px]">
                £{price.toFixed(2)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-gray-300 text-[14px] line-through">
                  £{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
