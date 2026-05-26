require('dotenv').config();

const wpUrl = process.env.WC_API_URL || "https://srv1565389.hstgr.cloud";
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

async function test() {
  const queries = ["India gate", "Pavizham"];
  for (const q of queries) {
    const url = new URL(`${wpUrl}/wp-json/wc/v3/products`);
    url.searchParams.append("consumer_key", consumerKey);
    url.searchParams.append("consumer_secret", consumerSecret);
    url.searchParams.append("search", q);
    
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(`\nResults for '${q}':`);
    data.forEach(p => {
      console.log(`- ${p.name} (Slug: ${p.slug})`);
      if (p.images && p.images.length > 0) {
        console.log(`  Image: ${p.images[0].src}`);
      }
    });
  }
}

test();
