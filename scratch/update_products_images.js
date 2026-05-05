
const axios = require('axios');
const fs = require('fs');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

const verifiedImages = {
  "Periyar Vadi Matta": "https://www.keralataste.com/cdn/shop/products/MattaRiceDoubleHorse_3efa859f-79e2-4f07-b221-621252151751_800x.jpg?v=1610116617",
  "Double Horse Matta": "https://www.keralataste.com/cdn/shop/products/MattaRiceDoubleHorse_3efa859f-79e2-4f07-b221-621252151751_800x.jpg?v=1610116617",
  "Ajmi Matta": "https://www.keralataste.com/cdn/shop/files/IMG-0210_800x.webp?v=1770839956",
  "Meeval Sona Masoori": "https://www.keralataste.com/cdn/shop/files/FullSizeRender_8211c254-6bfd-4ff0-9ee0-0cec80c70873_800x.jpg?v=1770114160",
  "India Gate Sona Masoori": "https://www.keralataste.com/cdn/shop/products/IndiaGateBasmatiRice_800x.jpg?v=1610116617",
  "Ajmi Chakki": "https://www.keralataste.com/cdn/shop/files/FullSizeRender_8211c254-6bfd-4ff0-9ee0-0cec80c70873_800x.jpg?v=1770114160",
  "Aashirvad": "https://www.lakshmistores.com/cdn/shop/products/AashirvaadWholeWheatAtta_800x.jpg",
  "Periyar Pappadam": "https://www.keralataste.com/cdn/shop/files/IMG-3284_800x.webp?v=1727963818",
  "Ajmi Puttu": "https://www.keralataste.com/cdn/shop/products/steamputtupodi_1_800x.jpg?v=1655917641",
  "Kitchen Treasures": "https://seelans.com/media/catalog/product/cache/9d65af4f99af9ddab4d1b38784514a93/9/4/9413.jpg",
  "Eastern Chicken": "https://www.keralataste.com/cdn/shop/products/ChickenMasalaEastern_800x.jpg?v=1610115291",
  "Saras": "https://www.keralataste.com/cdn/shop/products/ChickenCurryMixSaras_800x.jpg",
  "Viswas": "http://www.lakshmistores.com/cdn/shop/files/Untitled_500x500px_9_15fab60f-3d35-4786-9bb7-ab5604521093.png?v=1762799444",
  "Nissan": "https://www.keralataste.com/cdn/shop/products/Mixedfruit_800x.jpg",
  "Tata": "https://www.bbassets.com/media/uploads/p/xxl/241600_9-tata-salt-iodized.jpg",
  "Pillsbury": "https://www.bigbasket.com/media/uploads/p/l/10000000_1-pillsbury-chakki-fresh-atta.jpg",
  "Maggi": "https://www.bbassets.com/media/uploads/p/l/40020213_4-maggi-coconut-milk-powder.jpg",
  "Double Horse Soya": "https://www.bbassets.com/media/uploads/p/l/30004949_4-double-horse-soya-chunks-nano.jpg"
};

async function updateProducts() {
    let page = 1;
    let allUpdated = 0;
    
    while (true) {
        try {
            console.log(`Fetching products (Page ${page})...`);
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
                let foundImg = '';
                for (const [key, url] of Object.entries(verifiedImages)) {
                    if (p.name.toLowerCase().includes(key.toLowerCase())) {
                        foundImg = url;
                        break;
                    }
                }

                if (foundImg && (!p.images || p.images.length === 0 || p.images[0].src.includes('logo'))) {
                    console.log(`Updating ${p.name}`);
                    await axios.put(`${baseUrl}/products/${p.id}`, {
                        images: [{ src: foundImg }]
                    }, {
                        params: {
                            consumer_key: consumerKey,
                            consumer_secret: consumerSecret
                        }
                    }).catch(e => console.error(`Error ${p.name}: ${e.message}`));
                    allUpdated++;
                }
            }
            
            page++;
            if (page > 10) break; // Safety break
        } catch (error) {
            console.error('Batch error:', error.message);
            break;
        }
    }
    console.log(`Finished. Updated ${allUpdated} products.`);
}

updateProducts();
