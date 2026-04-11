"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  { name: "Eastern", logo: "/brands/eastern.png" },
  { name: "Double Horse", logo: "/brands/double-horse.png" },
  { name: "Ajmi", logo: "/brands/ajmi.svg" },
  { name: "Kitchen Treasures", logo: "/brands/kitchen-treasures.png" },
  { name: "Brahmins", logo: "/brands/brahmins.png" },
  { name: "India Gate", logo: "/brands/india-gate.png" },
  { name: "Periyar", logo: "/brands/periyar.png" },
  { name: "Nirapara", logo: "/brands/nirapara.png" },
  { name: "AVT", logo: "/brands/avt.png" },
  { name: "Tilda", logo: "/brands/tilda.png" },
];

export default function ShopByBrand() {
  return (
    <section className="py-24 bg-white border-y border-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-4 mb-16">
          <h3 className="text-3xl md:text-4xl font-heading font-black text-slate-900 leading-tight">
            Shop By <span className="text-accent italic">Trusted Brand</span>
          </h3>
          <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">
            We bring you the absolute best from Kerala's most loved and trusted
            household brands.
          </p>
        </div>

        <div className="brand-swiper-container">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="!pb-16"
          >
            {brands.map((brand, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center p-4 h-32 bg-slate-50 rounded-4xl border border-slate-100 hover:border-accent/20 hover:bg-white hover:shadow-premium transition-all group"
                >
                  <div className="relative w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain p-2 mix-blend-multiply"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .brand-swiper-container .swiper-pagination-bullet {
          @apply w-2.5 h-2.5 bg-slate-200 opacity-100 transition-all;
        }
        .brand-swiper-container .swiper-pagination-bullet-active {
          @apply w-8 bg-accent rounded-full;
        }
      `}</style>
    </section>
  );
}
