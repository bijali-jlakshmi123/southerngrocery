const axios = require('axios');

// Replace this with your actual deployed Next.js live domain
const NEXTJS_LIVE_DOMAIN = 'https://southernspicesstore.com';

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165'; // Your live WooCommerce Consumer Key
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe'; // Your live WooCommerce Consumer Secret
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

// Map your product names/slugs to the local image paths in your public folder
const localImageMapping = {
  "matta": "/matta-rice.png",
  "jeerakasala": "/jeerakasala-rice.png",
  "basmati": "/basmati-rice.png",
  "brown rice": "/brown-rice.png",
  "banana chips": "/banana-chips.png",
  "coconut oil": "/coconut-oil.png",
  "kappa": "/kappa.png",
  "mango pickle": "/mango-pickle.png",
  "porotta": "/porotta.png",
  "puttu": "/puttu-podi.png",
  "spices": "/spices-mix.png"
};

async function syncImagesToWooCommerce() {
    let page = 1;
    let updatedCount = 0;
    
    while (true) {
        try {
            console.log(`Fetching WooCommerce products (Page ${page})...`);
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
                let localImage = '';
                
                // Find matching product by name
                for (const [keyword, imgPath] of Object.entries(localImageMapping)) {
                    if (p.name.toLowerCase().includes(keyword.toLowerCase())) {
                        localImage = imgPath;
                        break;
                    }
                }

                if (localImage) {
                    const fullPublicUrl = `${NEXTJS_LIVE_DOMAIN}${localImage}`;
                    console.log(`Updating "${p.name}" with image: ${fullPublicUrl}`);
                    
                    await axios.put(`${baseUrl}/products/${p.id}`, {
                        images: [{ src: fullPublicUrl }]
                    }, {
                        params: {
                            consumer_key: consumerKey,
                            consumer_secret: consumerSecret
                        }
                    }).catch(e => console.error(`Failed to update ${p.name}: ${e.message}`));
                    
                    updatedCount++;
                }
            }
            
            page++;
            if (page > 10) break; // Safety limit
        } catch (error) {
            console.error('API Error:', error.message);
            break;
        }
    }
    console.log(`Sync complete. Updated ${updatedCount} products.`);
}

syncImagesToWooCommerce();
