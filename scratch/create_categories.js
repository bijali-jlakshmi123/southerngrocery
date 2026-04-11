
const axios = require('axios');
const fs = require('fs');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

const products = JSON.parse(fs.readFileSync('scratch/parsed_products.json', 'utf8'));
const categories = [...new Set(products.map(p => p.category))];

async function createCategories() {
    const catMap = {};
    for (const catName of categories) {
        try {
            console.log('Creating category:', catName);
            const response = await axios.post(baseUrl + '/products/categories', {
                name: catName
            }, {
                params: {
                    consumer_key: consumerKey,
                    consumer_secret: consumerSecret
                }
            });
            catMap[catName] = response.data.id;
            console.log('Created category ID:', response.data.id);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.code === 'term_exists') {
                catMap[catName] = error.response.data.data.resource_id;
                console.log('Category already exists ID:', catMap[catName]);
            } else {
                console.error('Error creating category:', catName, error.message);
            }
        }
    }
    fs.writeFileSync('scratch/category_map.json', JSON.stringify(catMap, null, 2));
}

createCategories();
