const wpUrl = (
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  process.env.WORDPRESS_URL ||
  "https://southernspicesstore.com"
).replace(/\/$/, "");

const consumerKey = process.env.WC_CONSUMER_KEY!;
const consumerSecret = process.env.WC_CONSUMER_SECRET!;

/**
 * Build WooCommerce REST API URL
 * Uses query-string authentication for maximum Hostinger compatibility
 */
function getWcUrl(endpoint: string, params: Record<string, any> = {}) {
  const url = new URL(`${wpUrl}/index.php`);

  url.searchParams.append("rest_route", `/wc/v3/${endpoint}`);
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

  return url;
}

/**
 * Generic WooCommerce GET request
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
      console.error(
        `[WooCommerce GET Error] ${endpoint}: HTTP ${response.status}`,
      );
      return { data: null };
    }

    if (!contentType.includes("application/json")) {
      const text = await response.text();
      return { data: text };
    }

    const data = await response.json();
    return { data };
  } catch (error: any) {
    console.error(`[WooCommerce GET Error] ${endpoint}:`, error.message);
    return { data: null };
  }
}

/**
 * Generic WooCommerce POST request
 * IMPORTANT: URL auth only (no Authorization header)
 */
async function woocommercePost(endpoint: string, data: any) {
  const url = getWcUrl(endpoint);

  try {
    console.log(`[WC DEBUG POST] ${url.toString()}`);
    console.log(`[WC DEBUG BODY]`, data);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error(
        `[WooCommerce POST Error] ${endpoint}: HTTP ${response.status}`,
        text,
      );

      return {
        data: null,
        error: text,
      };
    }

    const resData = JSON.parse(text);

    return {
      data: resData,
    };
  } catch (error: any) {
    console.error(`[WooCommerce POST Exception]:`, error.message);

    return {
      data: null,
      error: error.message,
    };
  }
}

export const api = {
  get: async (endpoint: string, params: any = {}) => {
    return await woocommerceFetch(endpoint, params);
  },

  post: async (endpoint: string, data: any) => {
    return await woocommercePost(endpoint, data);
  },
};

export const getProducts = async (params = {}) => {
  const response = await api.get("products", params);
  return Array.isArray(response.data) ? response.data : [];
};

export const getCategories = async (params = {}) => {
  const response = await api.get("products/categories", params);
  return Array.isArray(response.data) ? response.data : [];
};

export const getProductBySlug = async (slug: string) => {
  const response = await api.get("products", { slug });
  return response.data?.[0] || null;
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
