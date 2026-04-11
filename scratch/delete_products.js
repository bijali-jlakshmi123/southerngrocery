
const axios = require('axios');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

async function deleteProducts() {
    try {
        const response = await axios.get(baseUrl + '/products', {
            params: {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret,
                per_page: 100
            }
        });
        const ids = response.data.map(p => p.id);
        if (ids.length === 0) {
            console.log('No products to delete');
            return;
        }
        console.log('Deleting products:', ids);
        await axios.post(baseUrl + '/products/batch', {
            delete: ids
        }, {
            params: {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret
            }
        });
        console.log('Deleted successfully');
    } catch (error) {
        console.error('Error deleting products:', error.message);
    }
}

deleteProducts();
