const wpUrl = (
  process.env.WC_API_URL || 
  process.env.NEXT_PUBLIC_WORDPRESS_URL || 
  process.env.WORDPRESS_URL
)?.replace(/\/$/, "") || "https://srv1565389.hstgr.cloud";

const consumerKey = process.env.WC_CONSUMER_KEY!;
const consumerSecret = process.env.WC_CONSUMER_SECRET!;

/**
 * Build WooCommerce REST API URL
 * Uses query-string authentication for maximum Hostinger compatibility
 */
function getWcUrl(endpoint: string, params: Record<string, any> = {}) {
  const url = new URL(`${wpUrl}/wp-json/wc/v3/${endpoint}`);

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
    const basicAuth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      next: { revalidate: 0 },
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const body = await response.text().catch(() => "(could not read body)");
      console.error(
        `[WooCommerce GET Error] ${endpoint}: HTTP ${response.status}\nURL: ${url.toString()}\nResponse body: ${body.substring(0, 500)}`,
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
      console.error(`[WooCommerce POST Error] ${endpoint}: HTTP ${response.status}`);
      
      let errorMessage = text;
      // If it looks like HTML (starts with <! or contains <html>), don't return the whole thing
      if (text.trim().startsWith("<!") || text.includes("<html")) {
        errorMessage = `WordPress server returned an HTML error (HTTP ${response.status}). This usually means the endpoint URL is wrong or the server is blocking the request.`;
      } else {
        try {
          const json = JSON.parse(text);
          errorMessage = json.message || text;
        } catch (e) {}
      }

      return {
        data: null,
        error: errorMessage,
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

export const getCustomerOrders = async (customerId: string, email?: string) => {
  if (email) {
    return await api.get("orders", { search: email, t: Date.now() });
  }
  return await api.get("orders", { customer: customerId, t: Date.now() });
};

export const getOrder = async (orderId: string) => {
  return await api.get(`orders/${orderId}`, { t: Date.now() });
};

export const updateCustomer = async (customerId: string, data: any) => {
  return await api.post(`customers/${customerId}`, data);
};

export const getCustomer = async (customerId: string) => {
  return await api.get(`customers/${customerId}`, { t: Date.now() });
};

export default api;
