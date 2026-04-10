const wpUrl = (
  process.env.NEXT_PUBLIC_WORDPRESS_URL || 
  process.env.WORDPRESS_URL || 
  "https://southernspicesstore.com"
).replace(/\/$/, "");

const consumerKey =
  process.env.WC_CONSUMER_KEY || "ck_eea2ae033ba9ce250c473f597a5fc7139f59943c";
const consumerSecret =
  process.env.WC_CONSUMER_SECRET ||
  "cs_e4f0d3edde905941b7b8be2c07328a9bbd07b289";

/**
 * Centrally construct the WooCommerce API URL.
 */
function getWcUrl(endpoint: string) {
  const url = new URL(`${wpUrl}/`);
  url.searchParams.append("rest_route", `/wc/v3/${endpoint}`);
  return url;
}

/**
 * Get Basic Auth Header
 */
function getAuthHeader() {
  const credentials = `${consumerKey}:${consumerSecret}`;
  const token = typeof btoa !== "undefined" 
    ? btoa(credentials) 
    : Buffer.from(credentials).toString("base64");
  return { Authorization: `Basic ${token}` };
}

/**
 * Generic Fetch Wrapper for WooCommerce API
 */
async function woocommerceFetch(
  endpoint: string,
  params: Record<string, any> = {},
) {
  const url = getWcUrl(endpoint);

  // Add query params
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
        ...getAuthHeader(),
        Accept: "application/json, text/plain, */*",
      },
      next: { revalidate: 3600 },
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const errorText = await response.text();
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
  post: async (endpoint: string, data: any) => {
    try {
      const url = getWcUrl(endpoint);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type") || "";
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorText;
        } catch (e) {}
        console.error(`[WooCommerce Post Error] ${endpoint}:`, errorText);
        return { data: null, error: errorMessage };
      }

      if (!contentType.includes("application/json")) {
        return { data: null, error: "Received non-JSON response from server." };
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
