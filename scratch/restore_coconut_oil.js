const axios = require('axios');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

// Original Brand Images
const brandImages = [
  { slug: "coconut-oil", url: "https://m.media-amazon.com/images/I/61x5o-27GGL._AC_UF1000,1000_QL80_.jpg" },
  { slug: "ajmi-coconut-oil", url: "https://www.keralataste.com/cdn/shop/products/Cocopure_800x.jpg" }
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
                if (p.name.toLowerCase().includes('coconut oil')) {
                    const brandImg = p.name.toLowerCase().includes('ajmi') ? brandImages[1].url : brandImages[0].url;
                    console.log(`Restoring ${p.name} (${p.slug}) to original brand image...`);
                    await axios.put(`${baseUrl}/products/${p.id}`, {
                        images: [{ src: brandImg }]
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
        console.log(`Finished restoring original brand images for coconut oil.`);
    } catch (error) {
        console.error('API Error:', error.message);
    }
}

restoreBrandImages();
