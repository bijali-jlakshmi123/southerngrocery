"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children, categories }: { children: React.ReactNode, categories?: any[] }) {
  const pathname = usePathname();
  
  // Define routes where we DON'T want the Header and Footer
  const noLayoutRoutes = ["/login", "/register", "/signup"];
  const isNoLayout = noLayoutRoutes.includes(pathname);

  if (isNoLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
