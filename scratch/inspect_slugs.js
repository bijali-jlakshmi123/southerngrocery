
const axios = require('axios');
const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

async function listSlugs() {
    try {
        const response = await axios.get(baseUrl + '/products/categories', {
            params: {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret,
                per_page: 100
            }
        });
        const slugs = response.data.map(c => ({ name: c.name, slug: c.slug }));
        console.log(JSON.stringify(slugs, null, 2));
    } catch (error) {
        console.error(error.message);
    }
}
listSlugs();
