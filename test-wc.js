
const dotenv = require('dotenv');
dotenv.config();

const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

async function testFetch(urlStr) {
  const url = new URL(urlStr);
  url.searchParams.append("consumer_key", consumerKey || "dummy");
  url.searchParams.append("consumer_secret", consumerSecret || "dummy");

  console.log("Fetching URL:", url.toString());

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));
    
    const text = await response.text();
    console.log("Response starts with:", text.trim().substring(0, 50).replace(/\n/g, ' '));

    if (text.trim().startsWith("<")) {
        console.error("  -> Result: HTML (FAIL)");
    } else {
        try {
            JSON.parse(text);
            console.log("  -> Result: Success! Received JSON");
        } catch (e) {
            console.error("  -> Result: Malformed JSON or redirect (FAIL)");
        }
    }
  } catch (error) {
    console.error("  -> Fetch failed:", error.message);
  }
}

(async () => {
    console.log("--- Testing with User-Agent ---");
    await testFetch(`${wpUrl}/wp-json/wc/v3/products`);
})();
