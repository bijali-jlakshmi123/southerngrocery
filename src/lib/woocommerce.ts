import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://example.com",
  consumerKey: process.env.WC_CONSUMER_KEY || "ck_dummy",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "cs_dummy",
  version: "wc/v3"
});

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get("products", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getCategories = async (params = {}) => {
  try {
    const response = await api.get("products/categories", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const response = await api.get("products", { slug });
    return response.data[0];
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

export default api;
