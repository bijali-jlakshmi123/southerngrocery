const axios = require('axios');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

// Original Brand Images
const brandImages = [
  { slug: "matta-rice", url: "https://cdn.shopify.com/s/files/1/0669/9047/3439/files/5kg_1_abb1ec0f-330d-4c20-83e6-84bba447f517.jpg?v=1747973538" },
  { slug: "jeerakasala-rice", url: "https://www.keralataste.com/cdn/shop/products/JeerakasalaRiceDoubleHorse_800x.jpg" },
  { slug: "basmati-rice", url: "https://www.keralataste.com/cdn/shop/products/IndiaGateBasmatiRice_800x.jpg?v=1610116617" },
  { slug: "brown-rice", url: "https://www.keralataste.com/cdn/shop/products/PavizhamBrownRice_800x.jpg" }
];

async function restoreBrandImages() {
    try {
        console.log(`Fetching WooCommerce products...`);
        let page = 1;
        while (page <= 5) {
            const response = await axios.get(baseUrl + '/products', {
                params: {
                    consumer_key: consumerKey,
                    consumer_secret: consumerSecret,
                    per_page: 100,
                    page: page
                }
            });
            
            const products = response.data;
            if (!products || products.length === 0) break;

            for (const p of products) {
                const brandImg = brandImages.find(b => p.slug === b.slug || p.slug.includes(b.slug));
                if (brandImg) {
                    console.log(`Restoring ${p.name} (${p.slug}) to original brand image...`);
                    await axios.put(`${baseUrl}/products/${p.id}`, {
                        images: [{ src: brandImg.url }]
                    }, {
                        params: { consumer_key: consumerKey, consumer_secret: consumerSecret }
                    }).then(() => {
                        console.log(`Successfully restored ${p.name}`);
                    }).catch(e => {
                        console.error(`Failed to restore ${p.name}: ${e.message}`);
                    });
                }
            }
            page++;
        }
        console.log(`Finished restoring original brand images.`);
    } catch (error) {
        console.error('API Error:', error.message);
    }
}

restoreBrandImages();
