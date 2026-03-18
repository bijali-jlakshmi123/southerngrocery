'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

const brands = [
  'Eastern', 'Double Horse', 'Ajmi', 'Kitchen Treasures', 'Brahmins', 'India Gate', 'Periyar', 'Nirapara', 'AVT', 'Tilda'
];

export default function ShopByBrand() {
  return (
    <section className="py-24 bg-white border-y border-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-4 mb-16">
           <h3 className="text-3xl md:text-4xl font-heading font-black text-slate-900 leading-tight">
             Shop By <span className="text-accent italic">Trusted Brand</span>
           </h3>
           <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">We bring you the absolute best from Kerala's most loved and trusted household brands.</p>
        </div>

        <div className="brand-swiper-container">
           <Swiper
             modules={[Autoplay, Pagination]}
             spaceBetween={30}
             slidesPerView={2}
             breakpoints={{
               640: { slidesPerView: 3 },
               768: { slidesPerView: 4 },
               1024: { slidesPerView: 6 }
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
                   className="flex items-center justify-center h-32 bg-slate-50 rounded-4xl border border-slate-100 hover:border-accent/20 hover:bg-white hover:shadow-premium transition-all group px-4"
                 >
                    {/* Brand Logo Placeholder with Premium Minimalist Style */}
                    <div className="text-slate-300 group-hover:text-accent font-heading font-black italic text-xl tracking-tighter uppercase transition-colors select-none text-center">
                       {brand}
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
