import HeroSlider from "@/components/home/HeroSlider";
import CategoryGrid from "@/components/home/CategoryGrid";
import WeeklyDeals from "@/components/home/WeeklyDeals";
import ShopByBrand from "@/components/home/ShopByBrand";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustSection from "@/components/home/TrustSection";
import { getProducts } from "@/lib/woocommerce";
import { mapWcProduct } from "@/lib/utils";

const mockKeralaFavourites = [
  {
    id: 101,
    name: "Premium Matta Rice 5kg",
    price: 9.99,
    image: "/matta_rice_new.png",
    category: "Rice",
    slug: "matta-rice",
  },
  {
    id: 102,
    name: "Traditional Kerala Porotta (10pc)",
    price: 4.99,
    image: "/porotta.png",
    category: "Frozen",
    slug: "porotta",
  },
  {
    id: 103,
    name: "Boiled Kerala Kappa (Tapioca)",
    price: 3.49,
    image: "/kappa.png",
    category: "Frozen",
    slug: "kappa",
  },
  {
    id: 104,
    name: "Kerala Banana Chips 200g",
    price: 1.25,
    image: "/banana-chips.png",
    category: "Snacks",
    slug: "banana-chips",
  },
];

export default async function Home() {
  const wcProducts = await getProducts({ per_page: 50 });
  const realProducts = wcProducts.map(mapWcProduct);

  // Fetch real categories for the category grid
  const { getCategories } = await import("@/lib/woocommerce");
  const wcCategories = await getCategories({ hide_empty: true, per_page: 8 });
  const realCategories = wcCategories
    .filter(c => c.name !== "Uncategorized")
    .sort((a, b) => (b.count || 0) - (a.count || 0));

  // Split products into sections if we have them
  const favourites =
    realProducts.length > 0 ? realProducts.slice(0, 4) : mockKeralaFavourites.slice(0, 4);
  const arrivals = realProducts.length > 4 ? realProducts.slice(4, 8) : [];
  const deals = realProducts.length > 8 ? realProducts.slice(8, 12) : [];


  return (
    <main className="min-h-screen">
      <HeroSlider />

      <CategoryGrid categories={realCategories} />

      <WeeklyDeals />

      <ShopByBrand />

      <FeaturedProducts
        title="Kerala Favourites"
        subtitle="Bringing the authentic taste of home to your kitchen. Curated staples for every household."
        category="favourites"
        products={favourites}
        bgColor="bg-white"
        accentColor="text-primary"
      />

      {arrivals.length > 0 && (
        <FeaturedProducts
          title="New Arrivals"
          subtitle="Fresh from the homeland! Explore our latest additions and seasonal specialties."
          category="new-arrivals"
          products={arrivals}
          bgColor="bg-surface-muted"
          accentColor="text-secondary"
        />
      )}

      {deals.length > 0 && (
        <FeaturedProducts
          title="Weekly Offers"
          subtitle="Save big on your favorite authentic Indian brands Every Single Week."
          category="offers"
          products={deals}
          bgColor="bg-white"
          accentColor="text-success"
        />
      )}

      <TrustSection />
    </main>
  );
}
