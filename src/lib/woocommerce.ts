const wpUrl = (
  process.env.NEXT_PUBLIC_WORDPRESS_URL || 
  process.env.WORDPRESS_URL || 
  "https://southernspicesstore.com"
).replace(/\/$/, "");

// SECURE: Only use environment variables for API keys
const consumerKey = process.env.WC_CONSUMER_KEY!;
const consumerSecret = process.env.WC_CONSUMER_SECRET!;

/**
 * Centrally construct the WooCommerce API URL for GET requests.
 * Using query-parameter format for maximum compatibility with GET.
 */
function getWcUrl(endpoint: string, params: Record<string, any> = {}) {
  const url = new URL(`${wpUrl}/`);
  
  // Use the query parameter format for REST API
  url.searchParams.append("rest_route", `/wc/v3/${endpoint}`);
  url.searchParams.append("consumer_key", consumerKey);
  url.searchParams.append("consumer_secret", consumerSecret);
  
  // Add additional query params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        url.searchParams.append(key, value.join(","));
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  });
  
  return url;
}

/**
 * Generic Fetch Wrapper for WooCommerce API (GET)
 */
async function woocommerceFetch(
  endpoint: string,
  params: Record<string, any> = {},
) {
  const url = getWcUrl(endpoint, params);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      console.warn(
        `[WooCommerce Fetch Error] ${endpoint}: HTTP ${response.status}`,
      );
      return { data: null };
    }

    if (!contentType.includes("application/json")) {
      const text = await response.text();
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
    if (!Array.isArray(response.data)) return [];
    return response.data;
  } catch (error: any) {
    return [];
  }
};

export const getCategories = async (params = {}) => {
  try {
    const response = await woocommerceFetch("products/categories", params);
    if (!Array.isArray(response.data)) return [];
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

export const api = {
  get: async (endpoint: string, params: any = {}) => {
    return await woocommerceFetch(endpoint, params);
  },
  /**
   * Secure and Robust POST request handling using Basic Authorization header.
   * This format is required by many hosts (like Hostinger/Nginx) for write operations.
   */
  post: async (endpoint: string, data: any) => {
    try {
      const url = `${wpUrl}/wp-json/wc/v3/${endpoint}`;

      // Handle both server-side (Buffer) and client-side (btoa) environments
      const auth = typeof btoa !== "undefined"
        ? btoa(`${consumerKey}:${consumerSecret}`)
        : Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[WooCommerce POST Error] ${endpoint}:`, errorText);

        let errorMessage = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorText;
        } catch {}

        return { data: null, error: errorMessage };
      }

      if (!contentType.includes("application/json")) {
        return {
          data: null,
          error: "Received non-JSON response from server.",
        };
      }

      const resData = await response.json();
      return { data: resData };
    } catch (error: any) {
      console.error(`[WooCommerce Post Exception] ${endpoint}:`, error.message);
      return { data: null, error: error.message };
    }
  },
};

export const createOrder = async (orderData: any) => {
  return await api.post("orders", orderData);
};

export const getCustomerOrders = async (customerId: string) => {
  return await api.get("orders", { customer: customerId });
};

export const updateCustomer = async (customerId: string, data: any) => {
  return await api.post(`customers/${customerId}`, data);
};

export const getCustomer = async (customerId: string) => {
  return await api.get(`customers/${customerId}`);
};

export default api;
