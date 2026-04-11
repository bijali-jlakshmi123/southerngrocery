
const axios = require('axios');
require('dotenv').config();

const wpUrl = process.env.WC_API_URL || "https://srv1565389.hstgr.cloud";
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

async function testWC() {
    const url = `${wpUrl}/index.php?rest_route=/wc/v3/products&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    console.log("Testing URL:", url.replace(consumerSecret, '***'));
    
    try {
        const response = await axios.get(url);
        console.log("Success! Status:", response.status);
        console.log("Found", response.data.length, "products");
    } catch (error) {
        console.error("Error Status:", error.response?.status);
        console.error("Error Data:", JSON.stringify(error.response?.data, null, 2));
    }
}

testWC();
