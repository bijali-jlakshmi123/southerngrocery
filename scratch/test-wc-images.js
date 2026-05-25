require('dotenv').config();

const wpUrl = process.env.WC_API_URL || "https://srv1565389.hstgr.cloud";
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

async function test() {
  const url = new URL(`${wpUrl}/wp-json/wc/v3/products`);
  url.searchParams.append("consumer_key", consumerKey);
  url.searchParams.append("consumer_secret", consumerSecret);
  url.searchParams.append("search", "onion");

  const response = await fetch(url.toString());
  const data = await response.json();
  data.forEach(p => {
    console.log(`Product: ${p.name}`);
    console.log(`Images:`, JSON.stringify(p.images, null, 2));
  });

  const url2 = new URL(`${wpUrl}/wp-json/wc/v3/products`);
  url2.searchParams.append("consumer_key", consumerKey);
  url2.searchParams.append("consumer_secret", consumerSecret);
  url2.searchParams.append("search", "garlic");

  const response2 = await fetch(url2.toString());
  const data2 = await response2.json();
  data2.forEach(p => {
    console.log(`Product: ${p.name}`);
    console.log(`Images:`, JSON.stringify(p.images, null, 2));
  });
}

test();
