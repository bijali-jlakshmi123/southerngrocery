require('dotenv').config();

// Simple fetch since importing from TS files in JS is tricky
const wpUrl = process.env.WC_API_URL || "https://srv1565389.hstgr.cloud";
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

async function checkCategories() {
  const url = new URL(`${wpUrl}/wp-json/wc/v3/products/categories`);
  url.searchParams.append("consumer_key", consumerKey);
  url.searchParams.append("consumer_secret", consumerSecret);
  url.searchParams.append("per_page", "100");

  const res = await fetch(url.toString());
  const data = await res.json();
  console.log('Categories:', data.map(c => ({ id: c.id, name: c.name })));

  const tagUrl = new URL(`${wpUrl}/wp-json/wc/v3/products/tags`);
  tagUrl.searchParams.append("consumer_key", consumerKey);
  tagUrl.searchParams.append("consumer_secret", consumerSecret);
  tagUrl.searchParams.append("per_page", "100");
  
  const tagRes = await fetch(tagUrl.toString());
  const tagData = await tagRes.json();
  console.log('Tags:', tagData.map(t => ({ id: t.id, name: t.name })));
}

checkCategories();
