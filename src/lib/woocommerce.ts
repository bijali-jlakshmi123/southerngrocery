import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const wpUrl = (process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8000").replace(/\/$/, "");

console.log("Initializing WooCommerce API with URL:", wpUrl);

const api = new WooCommerceRestApi({
  url: wpUrl,
  consumerKey: process.env.WC_CONSUMER_KEY || "ck_dummy",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "cs_dummy",
  version: "wc/v3",
  queryStringAuth: true
});

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get("products", params);
    if (!Array.isArray(response.data)) {
        console.warn(`[WooCommerce Warning] Expected product array but got ${typeof response.data} from ${wpUrl}. Is the site in 'Preview' mode?`);
        return [];
    }
    return response.data;
  } catch (error: any) {
    console.error(`[WooCommerce Error] Failed to fetch products from ${wpUrl}:`, error.response?.data || error.message);
    return [];
  }
};

export const getCategories = async (params = {}) => {
  try {
    const response = await api.get("products/categories", params);
    if (!Array.isArray(response.data)) {
        console.warn(`[WooCommerce Warning] Expected category array but got ${typeof response.data} from ${wpUrl}. Is the site in 'Preview' mode?`);
        return [];
    }
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
