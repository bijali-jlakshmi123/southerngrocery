import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import WeeklyDeals from "@/components/home/WeeklyDeals";
import ShopByBrand from "@/components/home/ShopByBrand";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustSection from "@/components/home/TrustSection";

const keralaFavourites = [
  {
    id: 101,
    name: "Premium Matta Rice 5kg",
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
  {
    id: 105,
    name: "Traditional Mango Pickle 400g",
    price: 4.5,
    image: "/mango-pickle.png",
    category: "Pickles",
    slug: "mango-pickle",
  },
];

const busyFamilyMeals = [
  {
    id: 201,
    name: "Ready-to-Eat Kadala Curry",
    price: 2.49,
    image: "/spices-mix.png",
    category: "Ready Mix",
    slug: "kadala-curry",
  },
  {
    id: 202,
    name: "Traditional Semiya Payasam Mix",
    price: 1.15,
    image: "/spices-mix.png",
    category: "Ready Mix",
    slug: "payasam-mix",
  },
  {
    id: 203,
    name: "Fresh Idiyappam (Frozen Pack)",
    price: 1.99,
    image: "/porotta.png",
    category: "Frozen",
    slug: "idiyappam",
  },
  {
    id: 204,
    name: "Instant Appam / Upma Mix",
    price: 1.49,
    image: "/kappa.png",
    category: "Ready Mix",
    slug: "upma-mix",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <Hero />

      <CategoryGrid />

      <WeeklyDeals />

      <ShopByBrand />

      <FeaturedProducts
        title="Kerala Favourites"
        subtitle="Bringing the authentic taste of home to your kitchen. Curated staples for every household."
        category="favourites"
        products={keralaFavourites}
        bgColor="bg-white"
        accentColor="text-primary"
      />

      <FeaturedProducts
        title="Ready to Eat / Busy Family"
        subtitle="Quick, delicious Kerala meals for those busy UK workdays. No compromise on taste."
        category="ready-mix"
        products={busyFamilyMeals}
        bgColor="bg-surface-muted"
        accentColor="text-secondary"
      />

      <FeaturedProducts
        title="New Arrivals"
        subtitle="Fresh from the homeland! Explore our latest additions and seasonal specialties."
        category="new-arrivals"
        products={[
          {
            id: 301,
            name: "Fresh Nenthra Banana (Daily)",
            price: 3.49,
            image: "/fresh-veg.png",
            category: "Vegetables",
            slug: "nenthra-banana",
          },
          {
            id: 302,
            name: "Premium Jackfruit (Sliced) 500g",
            price: 4.99,
            image: "/fresh-veg.png",
            category: "Frozen",
            slug: "jackfruit",
          },
          {
            id: 303,
            name: "Ajmi Rice Puttu Podi 1kg",
            price: 1.65,
            image: "/puttu-podi.png",
            category: "Rice",
            slug: "puttu-podi",
          },
          {
            id: 304,
            name: "Kitchen Treasures Fish Masala",
            price: 0.99,
            image: "/spices-mix.png",
            category: "Spices",
            slug: "fish-masala",
          },
        ]}
        bgColor="bg-white"
        accentColor="text-success"
      />

      <TrustSection />

      <Footer />
    </main>
  );
}
