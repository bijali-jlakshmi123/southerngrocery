
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config();

const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

const api = new WooCommerceRestApi({
  url: wpUrl,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true
});

(async () => {
    // We can't easily see the internal URL but we can try a request and see if it fails the same way
    try {
        console.log("Fetching with Library...");
        const response = await api.get("products");
        console.log("Status:", response.status);
        console.log("Content Type:", response.headers['content-type']);
        console.log("Data type:", typeof response.data);
    } catch (e) {
        console.error("Library also failed!", e.message);
        if (e.response) {
            console.error("Response Status:", e.response.status);
            console.error("Response data (first 50):", String(e.response.data).substring(0, 50));
        }
    }
})();
