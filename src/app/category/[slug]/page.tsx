'use client';

import { useCart } from '@/lib/store';
import { Filter, SlidersHorizontal, ChevronDown, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, use } from 'react';
import ProductCard from '@/components/common/ProductCard';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [activeSort, setActiveSort] = useState('Featured');
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  const slugToCategory: Record<string, string> = {
    'rice': 'Rice & Rice Products',
    'atta': 'Atta, Flour & Grains',
    'pulses': 'Pulses & Lentils',
    'oils': 'Oil & Ghee',
    'frozen': 'Frozen Foods',
    'snacks': 'Snacks & Sweets',
    'pickles': 'Pickles & Chutneys',
    'vegetables': 'Fresh Vegetables',
    'beverages': 'Beverages',
    'kitchenware': 'Kitchenware',
    'ready-mix': 'Ready to Eat / Ready Mix',
    'new-arrivals': 'New Arrivals',
    'favourites': 'Kerala Favourites'
  };

  const currentCategory = slugToCategory[resolvedParams.slug] || resolvedParams.slug;

  const baseProducts = [
    // Rice
    { id: 1, name: 'Premium Kerala Matta Rice 5kg', price: 9.49, originalPrice: 12.99, image: '/matta-rice.png', category: 'Rice & Rice Products', subCategory: 'Matta Rice', brand: 'Double Horse', slug: 'matta-rice' },
    { id: 10, name: 'Double Horse Kaima Rice 1kg', price: 3.50, image: '/matta-rice.png', category: 'Rice & Rice Products', subCategory: 'Kaima Rice', brand: 'Double Horse', slug: 'kaima-rice' },
    { id: 11, name: 'India Gate Basmati Rice 5kg', price: 14.99, originalPrice: 18.00, image: '/matta-rice.png', category: 'Rice & Rice Products', subCategory: 'Basmati Rice', brand: 'India Gate', slug: 'basmati-rice' },
    { id: 12, name: 'Ajmi Rice Puttu Podi 1kg', price: 1.65, image: '/puttu-podi.png', category: 'Rice & Rice Products', subCategory: 'Rice Powder', brand: 'Ajmi', slug: 'puttu-podi' },
    
    // Atta
    { id: 13, name: 'Aashirvad Select Atta 5kg', price: 7.99, originalPrice: 9.50, image: '/puttu-podi.png', category: 'Atta, Flour & Grains', subCategory: 'Atta', brand: 'Aashirvad', slug: 'aashirvad-atta' },
    { id: 14, name: 'Pillsbury Chakki Fresh Atta 5kg', price: 8.49, image: '/puttu-podi.png', category: 'Atta, Flour & Grains', subCategory: 'Atta', brand: 'Pillsbury', slug: 'pillsbury-atta' },
    
    // Vegetables
    { id: 15, name: 'Fresh Nenthra Banana (Daily)', price: 3.49, originalPrice: 4.50, image: '/fresh-veg.png', category: 'Fresh Vegetables', subCategory: 'Fruits', brand: 'Fresh', slug: 'nenthra-banana' },
    { id: 16, name: 'Fresh Ginger (Imported) 500g', price: 1.99, image: '/fresh-veg.png', category: 'Fresh Vegetables', subCategory: 'Roots', brand: 'Fresh', slug: 'fresh-ginger' },
    { id: 17, name: 'Kerala Yam (Chena) 1kg', price: 4.50, image: '/fresh-veg.png', category: 'Fresh Vegetables', subCategory: 'Roots', brand: 'Fresh', slug: 'kerala-yam' },
    
    // Snacks
    { id: 2, name: 'Traditional Banana Chips 500g', price: 1.49, originalPrice: 1.99, image: '/banana-chips.png', category: 'Snacks & Sweets', subCategory: 'Kerala Snacks', brand: 'Homemade', slug: 'banana-chips' },
    { id: 18, name: 'Spicy Kerala Mixture 200g', price: 1.25, image: '/banana-chips.png', category: 'Snacks & Sweets', subCategory: 'Kerala Snacks', brand: 'Homemade', slug: 'kerala-mixture' },
    
    // Pickles
    { id: 3, name: 'Homemade Mango Pickle 400g', price: 4.50, originalPrice: 5.50, image: '/mango-pickle.png', category: 'Pickles & Chutneys', subCategory: 'Pickles', brand: 'Southern Spices', slug: 'mango-pickle' },
    { id: 19, name: 'Garlic Pickle (Poondu) 300g', price: 3.99, image: '/mango-pickle.png', category: 'Pickles & Chutneys', subCategory: 'Pickles', brand: 'Southern Spices', slug: 'garlic-pickle' },
    
    // Frozen
    { id: 20, name: 'Frozen Boiled Kappa 1kg', price: 2.99, originalPrice: 3.99, image: '/kappa.png', category: 'Frozen Foods', subCategory: 'Vegetables', brand: 'Periyar', slug: 'frozen-kappa' },
    { id: 21, name: 'Ready-to-Steam Idiyappam (10pc)', price: 1.99, image: '/porotta.png', category: 'Frozen Foods', subCategory: 'Ready-to-Eat', brand: 'Meeval', slug: 'frozen-idiyappam' },
    { id: 22, name: 'Traditional Kerala Porotta (10pc)', price: 4.99, image: '/porotta.png', category: 'Frozen Foods', subCategory: 'Ready-to-Eat', brand: 'Double Horse', slug: 'frozen-porotta' },
    
    // Oils
    { id: 23, name: 'Premium Coconut Oil 1L', price: 3.49, originalPrice: 5.50, image: '/coconut-oil.png', category: 'Oil & Ghee', subCategory: 'Coconut Oil', brand: 'Pavizham', slug: 'coconut-oil' },
    { id: 24, name: 'Parachute Coconut Oil 500ml', price: 2.99, image: '/coconut-oil.png', category: 'Oil & Ghee', subCategory: 'Coconut Oil', brand: 'Parachute', slug: 'parachute-oil' },
    
    // Spices
    { id: 4, name: 'Eastern Chicken Masala 100g', price: 0.79, originalPrice: 1.25, image: '/spices-mix.png', category: 'Spices & Masala', subCategory: 'Masala Powders', brand: 'Eastern', slug: 'chicken-masala' },
    { id: 25, name: 'Kitchen Treasures Turmeric Powder', price: 0.85, image: '/spices-mix.png', category: 'Spices & Masala', subCategory: 'Masala Powders', brand: 'Kitchen Treasures', slug: 'turmeric-powder' },
    
    // Pulses
    { id: 26, name: 'Premium Uzhunnu (Urad Dal) 1kg', price: 2.45, originalPrice: 3.25, image: '/spices-mix.png', category: 'Pulses & Lentils', subCategory: 'Pulses', brand: 'Southern Spices', slug: 'urad-dal' },
    { id: 27, name: 'Cherupayar (Moong Dal) 1kg', price: 2.15, image: '/spices-mix.png', category: 'Pulses & Lentils', subCategory: 'Pulses', brand: 'Southern Spices', slug: 'moong-dal' },

    // Ready to Eat / Ready Mix
    { id: 28, name: 'Traditional Semiya Payasam Mix', price: 1.15, originalPrice: 1.50, image: '/spices-mix.png', category: 'Ready to Eat / Ready Mix', subCategory: 'Payasam Mix', brand: 'Double Horse', slug: 'payasam-mix' },
    { id: 29, name: 'Ready-to-Eat Kadala Curry', price: 2.49, image: '/spices-mix.png', category: 'Ready to Eat / Ready Mix', subCategory: 'Curry', brand: 'Kitchen Treasures', slug: 'kadala-curry' },
    { id: 30, name: 'Instant Appam / Upma Mix', price: 1.49, image: '/kappa.png', category: 'Ready to Eat / Ready Mix', subCategory: 'Appam Mix', brand: 'Ajmi', slug: 'appam-mix' },
    { id: 31, name: 'Instant Idli Mix 500g', price: 1.99, image: '/puttu-podi.png', category: 'Ready to Eat / Ready Mix', subCategory: 'Idli Mix', brand: 'Brahmins', slug: 'idli-mix' },

    // New Arrivals
    { id: 301, name: 'Fresh Nenthra Banana (Daily)', price: 3.49, image: '/fresh-veg.png', category: 'New Arrivals', subCategory: 'Vegetables', brand: 'Fresh', slug: 'nenthra-banana' },
    { id: 302, name: 'Premium Jackfruit (Sliced) 500g', price: 4.99, image: '/fresh-veg.png', category: 'New Arrivals', subCategory: 'Frozen', brand: 'Nature', slug: 'jackfruit' },
    { id: 303, name: 'Ajmi Rice Puttu Podi 1kg', price: 1.65, image: '/puttu-podi.png', category: 'New Arrivals', subCategory: 'Rice', brand: 'Ajmi', slug: 'puttu-podi' },
    { id: 304, name: 'Kitchen Treasures Fish Masala', price: 0.99, image: '/spices-mix.png', category: 'New Arrivals', subCategory: 'Spices', brand: 'Kitchen Treasures', slug: 'fish-masala' },

    // Kerala Favourites
    { id: 101, name: 'Premium Matta Rice 5kg', price: 9.99, image: '/matta-rice.png', category: 'Kerala Favourites', subCategory: 'Rice', brand: 'Double Horse', slug: 'matta-rice' },
    { id: 102, name: 'Traditional Kerala Porotta (10pc)', price: 4.99, image: '/porotta.png', category: 'Kerala Favourites', subCategory: 'Frozen', brand: 'Meeval', slug: 'porotta' },
    { id: 103, name: 'Boiled Kerala Kappa (Tapioca)', price: 3.49, image: '/kappa.png', category: 'Kerala Favourites', subCategory: 'Frozen', brand: 'Periyar', slug: 'kappa' },
    { id: 104, name: 'Kerala Banana Chips 200g', price: 1.25, image: '/banana-chips.png', category: 'Kerala Favourites', subCategory: 'Snacks', brand: 'Homemade', slug: 'banana-chips' },
    { id: 105, name: 'Traditional Mango Pickle 400g', price: 4.50, image: '/mango-pickle.png', category: 'Kerala Favourites', subCategory: 'Pickles', brand: 'Southern Spices', slug: 'mango-pickle' }
  ];

  const categoryName = currentCategory;

  // Filtering Logic
  const categoryProducts = baseProducts.filter(p => p.category === currentCategory);
  
  const filteredProducts = categoryProducts
    .filter(p => {
      const matchesSubCat = selectedSubCats.length === 0 || selectedSubCats.includes(p.subCategory);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      return matchesSubCat && matchesBrand;
    })
    .sort((a, b) => {
      if (activeSort === 'Price: Low to High') return a.price - b.price;
      if (activeSort === 'Price: High to Low') return b.price - a.price;
      return 0; // Featured/Default
    });

  const subCategories = Array.from(new Set(categoryProducts.map(p => p.subCategory)));
  const brands = Array.from(new Set(categoryProducts.map(p => p.brand)));

  const toggleSubCat = (val: string) => {
    setSelectedSubCats(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
  };

  const toggleBrand = (val: string) => {
    setSelectedBrands(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
  };

  return (
    <div className="section-container pt-12 pb-24">
      {/* Category Header Strip */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 relative overflow-hidden p-12 bg-slate-50 rounded-5xl border border-slate-100">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
         
         <div className="relative z-10 text-center md:text-left">
            <div className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Discover the best</div>
            <h1 className="text-5xl lg:text-6xl font-heading font-black text-slate-900 tracking-tight capitalize mb-4">
               {categoryName}
            </h1>
            <p className="max-w-md text-slate-500 font-medium leading-relaxed">
               Authentic Kerala varieties and premium Indian selection, handpicked for quality and tradition.
            </p>
         </div>

         <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-premium border border-slate-50 text-slate-200">
               <ShoppingBag size={48} />
            </div>
            <div className="mt-4 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-glow">
              {filteredProducts.length} Products
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
         {/* Filter Sidebar - Desktop Only */}
         <aside className="hidden lg:block w-72 space-y-10 sticky top-28 h-fit">
            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
               <h3 className="text-lg font-heading font-black text-slate-900 mb-6 flex items-center gap-3 border-b pb-4 border-slate-50"><SlidersHorizontal size={18} className="text-primary" /> Filter</h3>
               
               <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sub Categories</h4>
                    <div className="space-y-3">
                       {subCategories.map((f) => (
                         <label key={f} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={selectedSubCats.includes(f)}
                              onChange={() => toggleSubCat(f)}
                              className="w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-primary checked:border-primary transition-all outline-none" 
                            />
                            <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{f}</span>
                         </label>
                       ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Brands</h4>
                    <div className="space-y-3">
                       {brands.map((f) => (
                         <label key={f} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={selectedBrands.includes(f)}
                              onChange={() => toggleBrand(f)}
                              className="w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-primary checked:border-primary transition-all outline-none" 
                            />
                            <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{f}</span>
                         </label>
                       ))}
                    </div>
                  </div>
               </div>
               
               {(selectedSubCats.length > 0 || selectedBrands.length > 0) && (
                 <button 
                   onClick={() => { setSelectedSubCats([]); setSelectedBrands([]); }}
                   className="mt-8 text-xs font-black text-primary underline underline-offset-4"
                 >
                   Clear All Filters
                 </button>
               )}
            </div>
         </aside>

         {/* Product Grid Content Side */}
         <div className="flex-1 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsFilterMobileOpen(true)}
                    className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors lg:hidden"
                  >
                     <Filter size={16} /> Filter
                  </button>
                  <p className="text-xs font-bold text-slate-400 hidden sm:block">Showing {filteredProducts.length} results</p>
               </div>

               <div className="flex items-center gap-3 relative group">
                  <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Sort By:</span>
                  <select 
                    value={activeSort}
                    onChange={(e) => setActiveSort(e.target.value)}
                    className="bg-transparent text-sm font-black text-slate-900 border-none outline-none cursor-pointer focus:ring-0"
                  >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
               </div>
            </div>

            <motion.div 
               layout
               className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
               <AnimatePresence mode='popLayout'>
                  {filteredProducts.map((p) => (
                    <motion.div 
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard {...p} />
                    </motion.div>
                  ))}
               </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="py-32 text-center bg-slate-50 rounded-5xl border border-dashed border-slate-200">
                 <p className="text-slate-400 font-medium text-lg italic">No products match your selected filters.</p>
                 <button onClick={() => { setSelectedSubCats([]); setSelectedBrands([]); }} className="mt-4 text-primary font-black uppercase text-xs tracking-widest underline">Reset Filters</button>
              </div>
            )}
         </div>
      </div>

      {/* Mobile Filter Drawer Drawer */}
      <AnimatePresence>
        {isFilterMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterMobileOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-[60] p-8 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-heading font-black text-slate-900">Filter</h3>
                <button onClick={() => setIsFilterMobileOpen(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400"><SlidersHorizontal size={20} /></button>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sub Categories</h4>
                  <div className="space-y-3">
                    {subCategories.map((f) => (
                      <label key={f} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSubCats.includes(f)}
                          onChange={() => toggleSubCat(f)}
                          className="w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-primary checked:border-primary transition-all outline-none"
                        />
                        <span className="text-sm font-bold text-slate-600">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Brands</h4>
                  <div className="space-y-3">
                    {brands.map((f) => (
                      <label key={f} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(f)}
                          onChange={() => toggleBrand(f)}
                          className="w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-primary checked:border-primary transition-all outline-none"
                        />
                        <span className="text-sm font-bold text-slate-600">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsFilterMobileOpen(false)}
                className="w-full btn-base btn-primary mt-12 py-4 shadow-premium"
              >
                Show Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
