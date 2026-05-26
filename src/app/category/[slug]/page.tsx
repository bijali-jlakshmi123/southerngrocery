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
  // Helper: merge results from multiple searches and deduplicate by product ID
  const mergeProducts = (arrays: any[][]) => {
    const seen = new Set<number>();
    return arrays.flat().filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  };

  let wcProducts: any[] = [];
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug === "favourites") {
    wcProducts = await getProducts({ per_page: 50 });
  } else if (normalizedSlug === "new-arrivals") {
    wcProducts = await getProducts({ per_page: 50, orderby: "date", order: "desc" });
  } else if (normalizedSlug === "offers") {
    wcProducts = await getProducts({ per_page: 50, on_sale: true });
  } else if (normalizedSlug === "rice-and-rice-products" || normalizedSlug === "rice") {
    wcProducts = await getProducts({ search: "rice", per_page: 100 });
  } else if (normalizedSlug === "atta-flour-grains" || normalizedSlug === "atta") {
    // Fetch atta and flour separately
    const [atta, flour] = await Promise.all([
      getProducts({ search: "atta", per_page: 100 }),
      getProducts({ search: "flour", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([atta, flour]);
  } else if (normalizedSlug === "pulses-and-lentils" || normalizedSlug === "pulses") {
    const [dal, pulses] = await Promise.all([
      getProducts({ search: "dal", per_page: 100 }),
      getProducts({ search: "lentil", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([dal, pulses]);
  } else if (normalizedSlug === "oil-and-ghee" || normalizedSlug === "oils") {
    // WooCommerce search is a single phrase — fetch oil and ghee in separate calls
    const [oils, ghee] = await Promise.all([
      getProducts({ search: "oil", per_page: 100 }),
      getProducts({ search: "ghee", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([oils, ghee]);
  } else if (normalizedSlug === "spices-and-masala" || normalizedSlug === "spices") {
    const [masala, spice] = await Promise.all([
      getProducts({ search: "masala", per_page: 100 }),
      getProducts({ search: "spice", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([masala, spice]);
  } else if (normalizedSlug === "pickles-and-chutneys" || normalizedSlug === "pickles") {
    const [pickle, chutney] = await Promise.all([
      getProducts({ search: "pickle", per_page: 100 }),
      getProducts({ search: "chutney", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([pickle, chutney]);
  } else if (normalizedSlug === "ready-to-eat") {
    const [ready, curry] = await Promise.all([
      getProducts({ search: "ready", per_page: 100 }),
      getProducts({ search: "curry mix", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([ready, curry]);
  } else if (normalizedSlug === "frozen-foods" || normalizedSlug === "frozen") {
    wcProducts = await getProducts({ search: "frozen", per_page: 100 });
  } else if (normalizedSlug === "snacks-and-sweets" || normalizedSlug === "snacks") {
    // Each search term must be sent separately
    const [snacks, chips, mixture, biscuit] = await Promise.all([
      getProducts({ search: "snack", per_page: 100 }),
      getProducts({ search: "chips", per_page: 100 }),
      getProducts({ search: "mixture", per_page: 100 }),
      getProducts({ search: "biscuit", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([snacks, chips, mixture, biscuit]);
  } else if (normalizedSlug === "beverages") {
    const [tea, coffee, drink] = await Promise.all([
      getProducts({ search: "tea", per_page: 100 }),
      getProducts({ search: "coffee", per_page: 100 }),
      getProducts({ search: "drink", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([tea, coffee, drink]);
  } else if (normalizedSlug === "dairy-and-milk-powder") {
    const [milk, dairy] = await Promise.all([
      getProducts({ search: "milk", per_page: 100 }),
      getProducts({ search: "dairy", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([milk, dairy]);
  } else if (normalizedSlug === "household-and-personal-care") {
    const [soap, paste, detergent] = await Promise.all([
      getProducts({ search: "soap", per_page: 100 }),
      getProducts({ search: "paste", per_page: 100 }),
      getProducts({ search: "detergent", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([soap, paste, detergent]);
  } else if (normalizedSlug === "fresh-vegetables" || normalizedSlug === "vegetables") {
    // WooCommerce category is "fresh-vegetable" (singular) — fetch by both slugs
    const [bySlug1, bySlug2, bySearch] = await Promise.all([
      getCategories({ slug: "fresh-vegetable" }).then((cats: any[]) =>
        cats[0]?.id ? getProducts({ category: cats[0].id, per_page: 100 }) : []
      ),
      getCategories({ slug: "fresh-vegetables" }).then((cats: any[]) =>
        cats[0]?.id ? getProducts({ category: cats[0].id, per_page: 100 }) : []
      ),
      getProducts({ search: "vegetable", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([bySlug1, bySlug2, bySearch]);
  } else if (normalizedSlug === "kitchenware") {
    const [cooker, kitchen] = await Promise.all([
      getProducts({ search: "cooker", per_page: 100 }),
      getProducts({ search: "kitchen", per_page: 100 }),
    ]);
    wcProducts = mergeProducts([cooker, kitchen]);
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
      name: "Double Horse Jeerakasala Rice",
      price: 18.00,
      originalPrice: 20.00,
      image: "/jeerakasala-rice.png",
      category: "Rice & Rice Products",
      subCategory: "Kaima Rice",
      brand: "Double Horse",
      slug: "jeerakasala-rice",
    },
    {
      id: 3,
      name: "India Gate Basmati Rice",
      price: 22.50,
      originalPrice: 24.50,
      image: "/basmati-rice.png",
      category: "Rice & Rice Products",
      subCategory: "Basmati Rice",
      brand: "India Gate",
      slug: "basmati-rice",
    },
    {
      id: 4,
      name: "Pavizham Brown Rice",
      price: 14.50,
      originalPrice: 17.00,
      image: "/brown-rice.png",
      category: "Rice & Rice Products",
      subCategory: "Brown Rice",
      brand: "Pavizham",
      slug: "brown-rice",
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
