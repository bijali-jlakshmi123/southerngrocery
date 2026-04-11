
const axios = require('axios');
const fs = require('fs');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

if (!fs.existsSync('scratch/final_image_mapping.json')) {
    console.error('Mapping file missing');
    process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync('scratch/final_image_mapping.json', 'utf8'));

async function updateAllProducts() {
    let page = 1;
    let totalUpdated = 0;

    while (true) {
        try {
            console.log('Processing page ' + page + '...');
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
                let imageUrl = '';

                // 1. Exact matches
                for (const entry of Object.entries(mapping.exactMatches || {})) {
                    const key = entry[0];
                    const url = entry[1];
                    if (p.name.toLowerCase().includes(key.toLowerCase())) {
                        imageUrl = url;
                        break;
                    }
                }

                // 2. Brand + Keyword matches
                if (!imageUrl) {
                    for (const entry of Object.entries(mapping.brandMappings || {})) {
                        const brand = entry[0];
                        const keywords = entry[1];
                        if (p.name.toLowerCase().includes(brand.toLowerCase())) {
                            for (const kEntry of Object.entries(keywords)) {
                                const keyword = kEntry[0];
                                const url = kEntry[1];
                                if (keyword !== 'Logo' && p.name.toLowerCase().includes(keyword.toLowerCase())) {
                                    imageUrl = url;
                                    break;
                                }
                            }
                            if (!imageUrl) imageUrl = keywords.Logo; 
                        }
                        if (imageUrl) break;
                    }
                }

                // 3. Category fallbacks
                if (!imageUrl || imageUrl.includes('Logo')) { 
                    const catName = p.categories?.[0]?.name;
                    if (catName && mapping.categoryFallbacks && mapping.categoryFallbacks[catName.toUpperCase()]) {
                        imageUrl = mapping.categoryFallbacks[catName.toUpperCase()];
                    }
                }

                if (imageUrl) {
                    console.log('Updating ' + p.name);
                    try {
                        await axios.put(baseUrl + '/products/' + p.id, {
                            images: [{ src: imageUrl }]
                        }, {
                            params: {
                                consumer_key: consumerKey,
                                consumer_secret: consumerSecret
                            }
                        });
                        totalUpdated++;
                    } catch (e) {
                        console.error('Failed ' + p.name + ': ' + e.message);
                    }
                }
            }

            page++;
            if (page > 10) break;
        } catch (error) {
            console.error('Batch error: ' + error.message);
            break;
        }
    }
    console.log('Finished updating ' + totalUpdated + ' products.');
}

updateAllProducts();
