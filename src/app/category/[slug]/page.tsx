import {
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  Filter,
} from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { getProducts } from "@/lib/woocommerce";
import { mapWcProduct } from "@/lib/utils";
import FilterClient from "./FilterClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const slugToCategory: Record<string, string> = {
    rice: "Rice & Rice Products",
    atta: "Atta, Flour & Grains",
    pulses: "Pulses & Lentils",
    oils: "Oil & Ghee",
    frozen: "Frozen Foods",
    snacks: "Snacks & Sweets",
    pickles: "Pickles & Chutneys",
    vegetables: "Fresh Vegetables",
    beverages: "Beverages",
    kitchenware: "Kitchenware",
    "ready-mix": "Ready to Eat / Ready Mix",
    "new-arrivals": "New Arrivals",
    favourites: "Kerala Favourites",
  };

  const currentCategoryName = slugToCategory[slug] || slug;

  // Fetch real products for this category
  // We try to match by category slug or search term
  const wcProducts = await getProducts({ category: slug, per_page: 50 });
  const realProducts = wcProducts.map(mapWcProduct);

  const mockProducts = [
    {
      id: 1,
      name: "Premium Kerala Matta Rice 5kg",
      price: 9.49,
      originalPrice: 12.99,
      image: "/matta-rice.png",
      category: "Rice & Rice Products",
      subCategory: "Matta Rice",
      brand: "Double Horse",
      slug: "matta-rice",
    },
    {
      id: 10,
      name: "Double Horse Kaima Rice 1kg",
      price: 3.5,
      image: "/matta-rice.png",
      category: "Rice & Rice Products",
      subCategory: "Kaima Rice",
      brand: "Double Horse",
      slug: "kaima-rice",
    },
    {
      id: 15,
      name: "Fresh Nenthra Banana (Daily)",
      price: 3.49,
      originalPrice: 4.5,
      image: "/fresh-veg.png",
      category: "Fresh Vegetables",
      subCategory: "Fruits",
      brand: "Fresh",
      slug: "nenthra-banana",
    },
    {
      id: 2,
      name: "Traditional Banana Chips 500g",
      price: 1.49,
      originalPrice: 1.99,
      image: "/banana-chips.png",
      category: "Snacks & Sweets",
      subCategory: "Kerala Snacks",
      brand: "Homemade",
      slug: "banana-chips",
    },
  ].filter((p) => p.category === currentCategoryName || slug === "all");

  const productsToDisplay =
    realProducts.length > 0 ? realProducts : mockProducts;

  return (
    <div className="section-container pt-12 pb-24">
      {/* Category Header Strip */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 relative overflow-hidden p-12 bg-slate-50 rounded-5xl border border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full blur-3xl translate-x-1/2" />

        <div className="relative z-10 text-center md:text-left">
          <div className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">
            Discover the best
          </div>
          <h1 className="text-5xl lg:text-6xl font-heading font-black text-slate-900 tracking-tight capitalize mb-4">
            {currentCategoryName}
          </h1>
          <p className="max-w-md text-slate-500 font-medium leading-relaxed">
            Authentic Kerala varieties and premium Indian selection, handpicked
            for quality and tradition.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-premium border border-slate-50 text-slate-200">
            <ShoppingBag size={48} />
          </div>
          <div className="mt-4 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-glow">
            {productsToDisplay.length} Products
          </div>
        </div>
      </div>

      <FilterClient initialProducts={productsToDisplay} />
    </div>
  );
}
