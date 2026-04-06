"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "Authentic Kerala Spices",
    subtitle:
      "Direct from God's Own Country to your kitchen in the UK. Pure, aromatic, and full of flavor.",
    image: "/hero-spices.png",
    cta: "Shop Spices",
    link: "/category/spices",
    color: "bg-primary",
  },
  {
    id: 2,
    title: "Fresh Organic Vegetables",
    subtitle:
      "Daily arrivals of fresh Kerala vegetables and fruits. Taste the freshness of home.",
    image: "/hero-vegetables.png",
    cta: "Shop Fresh",
    link: "/category/vegetables",
    color: "bg-secondary",
  },
  {
    id: 3,
    title: "Traditional Kerala Snacks",
    subtitle:
      "The crunch you love, the taste you remember. Banana chips, sharkara varatti, and more.",
    image: "/hero-snacks.png",
    cta: "Browse Snacks",
    link: "/category/snacks",
    color: "bg-primary",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-surface-muted">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="relative w-full h-full flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover transition-transform duration-[10000ms] ease-out scale-110"
                    style={{
                      transform: isActive ? "scale(1)" : "scale(1.1)",
                    }}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 relative z-10 text-center">
                  <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <div className="flex flex-col items-center space-y-6">
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                              Premium Quality
                            </span>
                          </motion.div>

                          <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
                          >
                            {slide.title.split(" ").map((word, i) => (
                              <span
                                key={i}
                                className={i === 1 ? "text-primary-light" : ""}
                              >
                                {word}{" "}
                              </span>
                            ))}
                          </motion.h1>

                          <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mx-auto"
                          >
                            {slide.subtitle}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                          >
                            <Link
                              href={slide.link}
                              className="btn-base btn-primary !rounded-full !px-10 py-4 shadow-xl hover:shadow-primary/40 flex items-center justify-center gap-2 group w-full sm:w-auto"
                            >
                              {slide.cta}
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                              href="/offers"
                              className="btn-base bg-white/10 backdrop-blur-md text-white border border-white/20 !rounded-full !px-10 py-4 hover:bg-white hover:text-secondary transition-all w-full sm:w-auto"
                            >
                              Todays Offers
                            </Link>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all backdrop-blur-sm group">
          <ChevronRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button className="swiper-button-next-custom absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all backdrop-blur-sm group">
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
        {/* Floating Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </Swiper>

      {/* CSS overrides for Swiper bullets */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #00A54F !important;
          width: 30px;
          border-radius: 5px;
        }
        .swiper-pagination {
          bottom: 40px !important;
          left: 50% !important;
          transform: translateX(-50%);
          text-align: center !important;
          width: auto !important;
        }
      `}</style>
    </section>
  );
}
