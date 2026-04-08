const wpUrl = (
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://southernspicesstore.com"
).replace(/\/$/, "");
const consumerKey =
  process.env.WC_CONSUMER_KEY || "ck_bdb3938c3c9bd4dabad293fdc33cff408e787415";
const consumerSecret =
  process.env.WC_CONSUMER_SECRET ||
  "cs_adc18e031db12de9f1aed8da80758a45a4c47c9d";

/**
 * Generic Fetch Wrapper for WooCommerce API
 */
async function woocommerceFetch(
  endpoint: string,
  params: Record<string, any> = {},
) {
  const url = new URL(`${wpUrl}/wp-json/wc/v3/${endpoint}`);

  // Add authentication and query params
  url.searchParams.append("consumer_key", consumerKey);
  url.searchParams.append("consumer_secret", consumerSecret);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        url.searchParams.append(key, value.join(","));
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  });

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour by default
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(
        `[WooCommerce Fetch Error] ${endpoint}: HTTP ${response.status} - Content-Type: ${contentType}`,
      );
      return { data: null };
    }

    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.warn(
        `[WooCommerce Warning] Received non-JSON response from ${endpoint}. Content-Type: ${contentType}. Usually means a redirect or server error.`,
      );
      return { data: text.trim().startsWith("<!DOCTYPE") ? null : text };
    }

    const data = await response.json();
    return { data };
  } catch (error: any) {
    console.error(`[WooCommerce Fetch Error] ${endpoint}:`, error.message);
    return { data: null };
  }
}

export const getProducts = async (params = {}) => {
  try {
    const response = await woocommerceFetch("products", params);
    if (!Array.isArray(response.data)) {
      console.warn(
        `[WooCommerce Warning] Expected product array but got ${typeof response.data} from ${wpUrl}. Is the site in 'Preview' mode?`,
      );
      return [];
    }
    return response.data;
  } catch (error: any) {
    return [];
  }
};

export const getCategories = async (params = {}) => {
  try {
    const response = await woocommerceFetch("products/categories", params);
    if (!Array.isArray(response.data)) {
      console.warn(
        `[WooCommerce Warning] Expected category array but got ${typeof response.data} from ${wpUrl}. Is the site in 'Preview' mode?`,
      );
      return [];
    }
    return response.data;
  } catch (error: any) {
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  if (!slug) return null;
  try {
    const response = await woocommerceFetch("products", { slug });
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error: any) {
    return null;
  }
};

// Mock the API object for any direct imports, though preferred to use exports above
export const api = {
  get: async (endpoint: string, params: any) => {
    const res = await woocommerceFetch(endpoint, params);
    return res;
  },
};

export default api;
