import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import MainLayout from "@/components/layout/MainLayout";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Southern Spices | Kerala & Indian Groceries Delivered Across UK",
  description:
    "Authentic Kerala and Indian groceries including Matta Rice, Kerala Snacks, Fresh Vegetables, and more. Delivered fast across the UK.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

import { getCategories } from "@/lib/woocommerce";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories: { id: number; name: string; slug: string }[] =
    await getCategories({ per_page: 100, hide_empty: true }).catch(() => []);

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased bg-background text-foreground overflow-x-hidden`}
        suppressHydrationWarning
      >
        <MainLayout categories={categories}>{children}</MainLayout>
        <WhatsAppButton />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
