
const axios = require('axios');
const fs = require('fs');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

const products = JSON.parse(fs.readFileSync('scratch/parsed_products.json', 'utf8'));
const catMap = JSON.parse(fs.readFileSync('scratch/category_map.json', 'utf8'));

const knownImages = {
  "Viswas rich Plum delight": "http://www.lakshmistores.com/cdn/shop/files/Untitled_500x500px_9_15fab60f-3d35-4786-9bb7-ab5604521093.png?v=1762799444",
  "Daily delight Jackfruit cake": "https://dailydelight.com/wp-content/uploads/2023/09/Jackfruit-Cake.png",
  "Elite Plum surprise": "http://i0.wp.com/elitefoods.co.in/img/product/plum-cakes/Plum%20Surprise%20680g%20-%208906009990125%20-%20Front.png?w=1000",
  "Periyar Vadi Matta Rice": "https://m.media-amazon.com/images/I/61bvqgO5BNL._AC_UF894,1000_QL80_.jpg",
  "Ajmi Matta Rice": "https://www.keralataste.com/cdn/shop/files/IMG-0210_800x.webp?v=1770839956",
  "India Gate Sona Masoori": "https://m.media-amazon.com/images/I/71CvU3Mn3HL._AC_UF894,1000_QL80_.jpg",
  "Aashirvad Whole Wheat Atta": "http://www.quickpantry.in/cdn/shop/products/aashirvaad-whole-wheat-atta-5-kg-quick-pantry.jpg?v=1710537925",
  "Maggi Milk Powder": "https://www.bbassets.com/media/uploads/p/l/40020213_4-maggi-coconut-milk-powder.jpg",
  "Double Horse Soya Chunks": "https://www.bbassets.com/media/uploads/p/l/30004949_4-double-horse-soya-chunks-nano.jpg",
  "Saras Chicken Curry Mix": "https://seelans.com/media/catalog/product/cache/9d65af4f99af9ddab4d1b38784514a93/9/4/9413.jpg",
  "Tata Salt": "https://www.bbassets.com/media/uploads/p/xxl/241600_9-tata-salt-iodized.jpg"
};

const brandLogos = {
  "Viswas": "https://viswasfoods.in/assets/images/1725723606footer-logo.png", // Corrected
  "Daily delight": "https://dailydelight.com/wp-content/themes/dailydelight/images/logo.png",
  "ELITE": "https://elitefoods.co.in/img/logo.png", // Corrected
  "Periyar": "https://periyarrice.com/wp-content/uploads/2024/08/new-logo.png", // Corrected
  "Ajmi": "https://ajmifoods.com/assets/images/Ajmi-Logo.svg", // SVG might fail, but let's try
  "Double horse": "https://doublehorse.in/cdn/shop/files/Website-Logo-Photoroom.png?v=1737635009", // Corrected
  "Aashirvad": "https://itcportal.com/brands-snapshots/aashirvaad-logo.jpg",
  "Maggi": "https://itcportal.com/brands-snapshots/aashirvaad-logo.jpg", // Fallback if Maggi svg fails
  "Saras": "https://sarasfoods.com/wp-content/themes/saras/images/logo.png",
  "Tata": "https://www.tata.com/content/dam/tata/images/logo/tata_logo_dark.png"
};

async function uploadBatch(batch) {
    for (const p of batch) {
        let imageUrl = '';
        // Match specific known images first
        for (const [key, url] of Object.entries(knownImages)) {
            if (p.name.toLowerCase().includes(key.toLowerCase())) {
                imageUrl = url;
                break;
            }
        }
        
        // If no specific image, try brand logo
        if (!imageUrl) {
            for (const [brand, url] of Object.entries(brandLogos)) {
                if (p.name.toLowerCase().includes(brand.toLowerCase())) {
                    imageUrl = url;
                    break;
                }
            }
        }

        const data = {
            name: p.name,
            type: 'simple',
            regular_price: p.price,
            categories: [
                { id: catMap[p.category] }
            ]
        };

        if (imageUrl) {
            data.images = [{ src: imageUrl }];
        }

        try {
            console.log('Adding product:', p.name);
            await axios.post(baseUrl + '/products', data, {
                params: {
                    consumer_key: consumerKey,
                    consumer_secret: consumerSecret
                }
            });
        } catch (error) {
            // If image fails, try adding without image
            if (error.response && error.response.data && error.response.data.code === 'woocommerce_product_image_upload_error') {
                console.log('Image failed for ' + p.name + ', adding without image');
                delete data.images;
                try {
                    await axios.post(baseUrl + '/products', data, {
                        params: {
                            consumer_key: consumerKey,
                            consumer_secret: consumerSecret
                        }
                    });
                } catch (e2) {
                    console.error('Final error for ' + p.name + ':', e2.message);
                }
            } else {
                console.error('Error adding product:', p.name, error.response ? error.response.data : error.message);
            }
        }
    }
}

async function main() {
    const batchSize = 10; // Even smaller for better error handling
    for (let i = 0; i < products.length; i += batchSize) {
        const batch = products.slice(i, i + batchSize);
        console.log('Uploading batch ' + (Math.floor(i/batchSize) + 1) + ' of ' + Math.ceil(products.length/batchSize));
        await uploadBatch(batch);
        await new Promise(r => setTimeout(r, 1000));
    }
}

main();
