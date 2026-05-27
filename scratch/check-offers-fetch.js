require('dotenv').config();
const wpUrl = process.env.WC_API_URL || "https://srv1565389.hstgr.cloud";
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

async function checkProducts() {
  const url = new URL(`${wpUrl}/wp-json/wc/v3/products`);
  url.searchParams.append("consumer_key", consumerKey);
  url.searchParams.append("consumer_secret", consumerSecret);
  url.searchParams.append("per_page", "100");

  const res = await fetch(url.toString());
  const products = await res.json();
  
  const offers = products.filter(p => p.on_sale);
  console.log('Products on sale:', offers.map(p => p.name));
  
  const weeklyProducts = products.filter(p => p.name.toLowerCase().includes('week') || p.name.toLowerCase().includes('offer') || p.categories.some(c => c.name.toLowerCase().includes('offer') || c.name.toLowerCase().includes('week')));
  console.log('Products matching "week" or "offer" in name/category:', weeklyProducts.map(p => p.name));
}

checkProducts();
