import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const wpUrl = (process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8000").replace(/\/$/, "");

const api = new WooCommerceRestApi({
  url: wpUrl,
  consumerKey: process.env.WC_CONSUMER_KEY || "ck_dummy",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "cs_dummy",
  version: "wc/v3",
  queryStringAuth: true // Required for some local/HTTP setups
});

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get("products", params);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return [];
  }
};

export const getCategories = async (params = {}) => {
  try {
    const response = await api.get("products/categories", params);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  if (!slug) return null;
  try {
    const response = await api.get("products", { slug });
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error: any) {
    console.error(`Error fetching product by slug [${slug}]:`, error.response?.data || error.message);
    // If it's a 404, it might mean the REST API path is wrong on the server 
    // or WooCommerce is not properly configured.
    return null;
  }
};

export default api;
