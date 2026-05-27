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
    name: "Double Horse Matta Rice 5kg",
    price: 9.99,
    image: "/matta-rice.png",
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
  const mattaRiceProduct = realProducts.find((product) => product.slug === "matta-rice");
  const mattaRiceFavourite = {
    ...mockKeralaFavourites[0],
    ...mattaRiceProduct,
    name: mattaRiceProduct?.name || "Double Horse Matta Rice 5kg",
    image: mattaRiceProduct?.image && mattaRiceProduct.image !== "/placeholder.png" ? mattaRiceProduct.image : "/matta-rice.png",
    slug: "matta-rice",
  };
  const realProductsWithoutMattaRice = realProducts.filter(
    (product) => product.slug !== "matta-rice",
  );

  // Fetch real categories for the category grid
  const { getCategories } = await import("@/lib/woocommerce");
  const wcCategories = await getCategories({ hide_empty: true, per_page: 8 });
  const realCategories = wcCategories
    .filter((c) => c.name !== "Uncategorized")
    .sort((a, b) => (b.count || 0) - (a.count || 0));

  // Split products into sections if we have them
  const favourites =
    realProducts.length > 0
      ? [mattaRiceFavourite, ...realProductsWithoutMattaRice].slice(0, 4)
      : mockKeralaFavourites.slice(0, 4);
  const arrivals =
    realProductsWithoutMattaRice.length > 4
      ? realProductsWithoutMattaRice.slice(4, 8)
      : [];
  const onSaleProducts = realProducts.filter(
    (p) => p.originalPrice && p.originalPrice > p.price,
  );
  const weeklyDeals =
    onSaleProducts.length > 0
      ? onSaleProducts.slice(0, 5)
      : realProducts
          .filter((p) => p.price > 0)
          .slice(0, 5)
          .map((p) => ({
            ...p,
            originalPrice: Number((p.price * 1.15).toFixed(2)),
          }));

  return (
    <main className="min-h-screen">
      <HeroSlider />

      <CategoryGrid categories={realCategories} />

      <WeeklyDeals deals={weeklyDeals} />

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

      <TrustSection />
    </main>
  );
}
