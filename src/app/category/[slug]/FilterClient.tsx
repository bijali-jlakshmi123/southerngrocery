"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";

export default function FilterClient({
  initialProducts,
}: {
  initialProducts: any[];
}) {
  const [activeSort, setActiveSort] = useState("Featured");
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  const filteredProducts = initialProducts
    .filter((p) => {
      const matchesSubCat =
        selectedSubCats.length === 0 ||
        selectedSubCats.includes(p.subCategory || "Other");
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(p.brand || "Other");
      return matchesSubCat && matchesBrand;
    })
    .sort((a, b) => {
      if (activeSort === "Price: Low to High") return a.price - b.price;
      if (activeSort === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  const subCategories = Array.from(
    new Set(initialProducts.map((p) => p.subCategory || "Other")),
  ).filter(Boolean);
  const brands = Array.from(
    new Set(initialProducts.map((p) => p.brand || "Other")),
  ).filter(Boolean);

  const toggleSubCat = (val: string) => {
    setSelectedSubCats((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
    );
  };

  const toggleBrand = (val: string) => {
    setSelectedBrands((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Filter Sidebar - Desktop Only */}
      <aside className="hidden lg:block w-72 space-y-10 sticky top-28 h-fit">
        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-heading font-black text-slate-900 mb-8 flex items-center gap-3">
            <Filter size={20} className="text-primary" /> Filter
          </h3>

          <div className="space-y-10">
            {subCategories.length > 0 && (
              <div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                  Sub Categories
                </h4>
                <div className="space-y-4">
                  {subCategories.map((f) => (
                    <label
                      key={f}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubCats.includes(f)}
                        onChange={() => toggleSubCat(f)}
                        className="w-5 h-5 rounded border-2 border-slate-200 checked:bg-primary checked:border-primary transition-all outline-none"
                      />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {brands.length > 0 && (
              <div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                  Brands
                </h4>
                <div className="space-y-4">
                  {brands.map((f) => (
                    <label
                      key={f}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(f)}
                        onChange={() => toggleBrand(f)}
                        className="w-5 h-5 rounded border-2 border-slate-200 checked:bg-primary checked:border-primary transition-all outline-none"
                      />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {(selectedSubCats.length > 0 || selectedBrands.length > 0) && (
            <button
              onClick={() => {
                setSelectedSubCats([]);
                setSelectedBrands([]);
              }}
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
            <p className="text-xs font-bold text-slate-400 hidden sm:block">
              Showing {filteredProducts.length} results
            </p>
          </div>

          <div className="flex items-center gap-3 relative group">
            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">
              Sort By:
            </span>
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
          <AnimatePresence mode="popLayout">
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
            <p className="text-slate-400 font-medium text-lg italic">
              No products match your selected filters.
            </p>
            <button
              onClick={() => {
                setSelectedSubCats([]);
                setSelectedBrands([]);
              }}
              className="mt-4 text-primary font-black uppercase text-xs tracking-widest underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
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
                <h3 className="text-xl font-heading font-black text-slate-900">
                  Filter
                </h3>
                <button
                  onClick={() => setIsFilterMobileOpen(false)}
                  className="p-2 bg-slate-50 rounded-xl text-slate-400"
                >
                  <SlidersHorizontal size={20} />
                </button>
              </div>

              <div className="space-y-10">
                {subCategories.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                      Sub Categories
                    </h4>
                    <div className="space-y-3">
                      {subCategories.map((f) => (
                        <label
                          key={f}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubCats.includes(f)}
                            onChange={() => toggleSubCat(f)}
                            className="w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-primary checked:border-primary transition-all outline-none"
                          />
                          <span className="text-sm font-bold text-slate-600">
                            {f}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
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
