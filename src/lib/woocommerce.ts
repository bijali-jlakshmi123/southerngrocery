import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://example.com",
  consumerKey: process.env.WC_CONSUMER_KEY || "ck_dummy",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "cs_dummy",
  version: "wc/v3"
});

export default api;
