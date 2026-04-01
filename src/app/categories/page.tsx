'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Package,
  ArrowLeft
} from 'lucide-react';

const categories = [
  {
    id: 'rice',
    name: 'Rice & Rice Products',
    count: '8+ Subcategories',
    image: '/cat-rice.png',
    color: 'from-orange-500/10 to-transparent',
    accent: 'text-primary',
    description: 'Premium Matta, Kaima, Ponni, and Sona Masoori.',
    subcategories: [
      'Matta Rice (Periyar, Double Horse, KT, Ajmi, Nila)',
      'Kaima / Jeerakasala (Meeval, Ajmi, India Gate)',
      'Basmati Rice (Tilda, India Gate, Farm Kitchen)',
      'Ponni Rice (KT, Shankar, India Gate)',
      'Rice Powder & Puttu Podi (Ajmi, Brahmins)',
      'Rice Flakes / Aval (White & Brown)'
    ]
  },
  {
    id: 'atta',
    name: 'Atta, Flour & Grains',
    count: '10+ Varieties',
    image: '/cat-flour.png', 
    color: 'from-stone-500/10 to-transparent',
    accent: 'text-stone-700',
    description: 'Premium Atta, Ragi, and traditional flour mixes.',
    subcategories: [
      'Pillsbury & Aashirvad Atta',
      'Ajmi Roasted Atta',
      'Ragi & Roasted Rice Powder',
      'Broken Wheat & Maida',
      'Gram Flour (Besan)'
    ]
  },
  {
    id: 'pulses',
    name: 'Pulses & Lentils',
    count: '15+ Varieties',
    image: '/cat-pulses.png',
    color: 'from-orange-200/10 to-transparent',
    accent: 'text-orange-900',
    description: 'Authentic Uzhunnu, Dal, and traditional pulses.',
    subcategories: [
      'Uzhunnu (Urad Dal)',
      'Cherupayar (Moong Dal)',
      'Vanpayar (Red Cow Peas)',
      'Kadala (Black Chickpeas)',
      'Parippu (Toor Dal)'
    ]
  },
  {
    id: 'oils',
    name: 'Oil & Ghee',
    count: '3 Distinct Types',
    image: '/cat-oils.png',
    color: 'from-yellow-500/10 to-transparent',
    accent: 'text-yellow-600',
    description: 'Pure Coconut Oil, Ghee, and Sunflower oils.',
    subcategories: [
      'Coconut Oil (Pavizham, Ajmi, Parachute)',
      'KTC Sunflower & Vegetable Oil',
      'Pure Ghee (GRB, Patanjali)',
      'Mustard & Gingelly Oil'
    ]
  },
  {
    id: 'spices',
    name: 'Spices & Masala',
    count: '25+ Traditional Brands',
    image: '/cat-spices.png',
    color: 'from-red-500/10 to-transparent',
    accent: 'text-secondary',
    description: 'Authentic ground spices and traditional masala blends.',
    subcategories: [
      'Whole Spices (Mustard, Jeera, Cardamom)',
      'Masala Powders (Eastern, Ajmi, Brahmins)',
      'Chilli, Turmeric & Coriander Powders',
      'Chicken, Meat & Sambar Masala'
    ]
  },
  {
    id: 'frozen',
    name: 'Frozen Foods',
    count: 'Ready-to-Steam',
    image: '/cat-frozen.png',
    color: 'from-blue-500/10 to-transparent',
    accent: 'text-accent',
    description: 'Ready-to-eat porotta, kappa, and traditional frozen delights.',
    subcategories: [
      'Frozen Kappa & Jackfruit',
      'Ready Idiyappam & Porotta',
      'Grated Coconut',
      'Avial Mix & Drumsticks'
    ]
  },
  {
    id: 'snacks',
    name: 'Snacks & Sweets',
    count: 'Traditional & Packaged',
    image: '/cat-snacks.png',
    color: 'from-amber-600/10 to-transparent',
    accent: 'text-amber-700',
    description: 'Crispy banana chips, murukku, and traditional treats.',
    subcategories: [
      'Kerala Snacks (Banana Chips, Mixture)',
      'Biscuits (Parle G, Dark Fantasy)',
      'Sweets (Halwa, Soan Papdi, Laddu)',
      'Kurkure & Savoury Snacks'
    ]
  },
  {
    id: 'pickles',
    name: 'Pickles & Chutneys',
    count: 'Homemade Style',
    image: '/cat-pickles.png',
    color: 'from-red-800/10 to-transparent',
    accent: 'text-red-900',
    description: 'Homemade style mango, lime, and seafood pickles.',
    subcategories: [
      'Mango, Lime & Garlic Pickles',
      'Prawn & Fish Pickles',
      'Traditional Chammanthi'
    ]
  },
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    count: 'Updated Daily',
    image: '/cat-vegetables.png',
    color: 'from-green-500/10 to-transparent',
    accent: 'text-success',
    description: 'Fresh Vegetables – Price on Request / Updated Daily. Directly sourced fresh produce delivered across UK.',
    subcategories: [
      'Nenthra Banana',
      'Ginger & Onion',
      'Mathanga (Pumpkin)',
      'Chena (Yam)'
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    count: 'Tea, Coffee & Squash',
    image: '/cat-beverages.png',
    color: 'from-cyan-500/10 to-transparent',
    accent: 'text-cyan-700',
    description: 'Authentic Kerala tea, coffee, and traditional health drinks.',
    subcategories: [
      'Tea (Tata, Red Label)',
      'Coffee (Nescafe, Nadan)',
      'Horlicks & Boost'
    ]
  },
  {
    id: 'kitchenware',
    name: 'Kitchenware',
    count: 'Pre-order Section',
    image: '/cat-kitchenware.png',
    color: 'from-slate-500/10 to-transparent',
    accent: 'text-slate-800',
    description: 'Traditional Puttu makers, Chatty, and Pressure cookers.',
    subcategories: [
      'Puttu & Idiyappam Makers',
      'Pressure Cookers',
      'Traditional Chatty',
      'Mixies (Pre-order)'
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CategoriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Section Section */}
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

      {/* Grid Section Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link href={`/category/${category.id}`} className="group block h-full">
                <div className="bg-white rounded-5xl p-8 shadow-sm hover:shadow-premium transition-all duration-500 border border-slate-100 flex flex-col h-full relative overflow-hidden group-hover:-translate-y-2">
                  <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                      <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{category.count}</div>
                      <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-50 opacity-0 group-hover:opacity-100 transition-all group-hover:bg-primary group-hover:text-white ${category.accent}`}>
                         <ArrowRight size={20} />
                      </div>
                    </div>

                    <div className="w-full h-48 relative mb-8 flex items-center justify-center">
                       <motion.div
                         whileHover={{ scale: 1.1, rotate: 5 }}
                         className="relative w-full h-full"
                       >
                         <Image 
                           src={category.image} 
                           alt={category.name} 
                           fill 
                           className="object-contain"
                         />
                       </motion.div>
                    </div>

                    <h3 className="text-2xl font-heading font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
                       {category.description}
                    </p>

                    {/* Subcategories List List */}
                    {category.subcategories && (
                      <div className="space-y-3 pt-6 border-t border-slate-50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">Popular in this Category</div>
                        <ul className="grid grid-cols-1 gap-2">
                          {category.subcategories.slice(0, 4).map((sub, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-[13px] font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                              <div className="w-1 h-1 bg-primary/30 rounded-full" />
                              {sub}
                            </li>
                          ))}
                          {category.subcategories.length > 4 && (
                            <li className="text-[11px] font-black text-primary uppercase tracking-widest pt-2">
                              + {category.subcategories.length - 4} More Subcategories
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Links Section Section */}
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
