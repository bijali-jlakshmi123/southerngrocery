require('dotenv').config();

const wpUrl = process.env.WC_API_URL || "https://srv1565389.hstgr.cloud";
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

async function test() {
  const url = new URL(`${wpUrl}/wp-json/wc/v3/products`);
  url.searchParams.append("consumer_key", consumerKey);
  url.searchParams.append("consumer_secret", consumerSecret);
  url.searchParams.append("per_page", "2");

  const response = await fetch(url.toString());
  const data = await response.json();
  console.log(JSON.stringify(data[0]?.images, null, 2));
}

test();
