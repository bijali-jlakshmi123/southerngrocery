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

  const { getCategories } = await import("@/lib/woocommerce");
  const wcCategories = await getCategories({ slug });
  const currentCategory = wcCategories?.[0];
  const currentCategoryName = currentCategory?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Fetch real products for this category
  // Handle virtual categories and broad categories
  let wcProducts = [];
  const normalizedSlug = slug.toLowerCase();
  
  if (normalizedSlug === "favourites") {
    wcProducts = await getProducts({ per_page: 50 });
  } else if (normalizedSlug === "new-arrivals") {
    wcProducts = await getProducts({ per_page: 50, orderby: "date", order: "desc" });
  } else if (normalizedSlug === "offers") {
    wcProducts = await getProducts({ per_page: 50, on_sale: true });
  } else if (normalizedSlug === "rice-and-rice-products" || normalizedSlug === "rice") {
    wcProducts = await getProducts({ search: "rice kaima ponni sona masoori basmati puttu podi aval riceflakes", per_page: 100 });
  } else if (normalizedSlug === "atta-flour-grains" || normalizedSlug === "atta") {
    wcProducts = await getProducts({ search: "atta aatta flour ragi wheat maida grain", per_page: 100 });
  } else if (normalizedSlug === "pulses-and-lentils" || normalizedSlug === "pulses") {
    wcProducts = await getProducts({ search: "pulses uzhunnu dal parippu cherupayar lentil peas kadala", per_page: 100 });
  } else if (normalizedSlug === "oil-and-ghee" || normalizedSlug === "oils") {
    wcProducts = await getProducts({ search: "oil ghee coconut sunflower vegetable", per_page: 100 });
  } else if (normalizedSlug === "spices-and-masala" || normalizedSlug === "spices") {
    wcProducts = await getProducts({ search: "masala powder spices chilli turmeric coriander whole spices", per_page: 100 });
  } else if (normalizedSlug === "pickles-and-chutneys" || normalizedSlug === "pickles") {
    wcProducts = await getProducts({ search: "pickle chutney chammanthi ginger garlic lime mango", per_page: 100 });
  } else if (normalizedSlug === "ready-to-eat") {
    wcProducts = await getProducts({ search: "ready instant mix upma payasam idly appam curry", per_page: 100 });
  } else if (normalizedSlug === "frozen-foods" || normalizedSlug === "frozen") {
    wcProducts = await getProducts({ search: "frozen kappa jackfruit drumstick porotta coconut grated", per_page: 100 });
  } else if (normalizedSlug === "snacks-and-sweets" || normalizedSlug === "snacks") {
    wcProducts = await getProducts({ search: "snacks sweets chips mixture biscuit halwa laddu sweets cake", per_page: 100 });
  } else if (normalizedSlug === "beverages") {
    wcProducts = await getProducts({ search: "tea coffee squash horlicks boost beverages drink", per_page: 100 });
  } else if (normalizedSlug === "dairy-and-milk-powder") {
    wcProducts = await getProducts({ search: "milk powder dairy maggi milk", per_page: 100 });
  } else if (normalizedSlug === "household-and-personal-care") {
    wcProducts = await getProducts({ search: "soap toothpaste hair oil agarbathi personal household", per_page: 100 });
  } else if (normalizedSlug === "fresh-vegetables" || normalizedSlug === "vegetables") {
    wcProducts = await getProducts({ search: "fresh vegetable banana ginger onion chena mathanga kumbalanga", per_page: 100 });
  } else if (normalizedSlug === "kitchenware") {
    wcProducts = await getProducts({ search: "kitchenware maker cooker chatie mixie", per_page: 100 });
  } else {
    wcProducts = await getProducts({ category: currentCategory?.id || slug, per_page: 50 });
  }
  
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
            {normalizedSlug === "fresh-vegetables" || normalizedSlug === "vegetables" 
              ? "Fresh Vegetables – Price on Request / Updated Daily. Visit us or call for current rates."
              : normalizedSlug === "kitchenware"
              ? "Kitchenware – Pre-order Section. Exclusive traditional Kerala kitchen tools."
              : "Authentic Kerala varieties and premium Indian selection, handpicked for quality and tradition."}
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-premium border border-slate-50 text-slate-200">
            {normalizedSlug === "fresh-vegetables" || normalizedSlug === "vegetables" ? (
              <span className="text-primary font-black text-xl">DAILY</span>
            ) : normalizedSlug === "kitchenware" ? (
              <span className="text-secondary font-black text-xl">PRE</span>
            ) : (
                <ShoppingBag size={48} />
            )}
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
