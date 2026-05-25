require('dotenv').config();
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "https://srv1565389.hstgr.cloud",
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});

api.get("products", { per_page: 2 })
  .then((response) => {
    console.log(JSON.stringify(response.data[0].images, null, 2));
  })
  .catch((error) => {
    console.log(error.response.data);
  });
