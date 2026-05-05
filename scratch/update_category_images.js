
const axios = require('axios');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

const catImages = {
    "RICE": "https://m.media-amazon.com/images/I/71CvU3Mn3HL._AC_UF1000,1000_QL80_.jpg",
    "MATTA RICES": "https://m.media-amazon.com/images/I/61bvqgO5BNL._AC_UF894,1000_QL80_.jpg",
    "AATTA'S": "http://www.quickpantry.in/cdn/shop/products/aashirvaad-whole-wheat-atta-5-kg-quick-pantry.jpg?v=1710537925",
    "SNACKS": "https://m.media-amazon.com/images/I/71YyP9fLqHL._AC_UF1000,1000_QL80_.jpg",
    "PICKLES": "https://seelans.com/media/catalog/product/cache/9d65af4f99af9ddab4d1b38784514a93/9/4/9413.jpg",
    "MASALA POWDERS": "https://m.media-amazon.com/images/I/81xU+7VpWDL._AC_UF1000,1000_QL80_.jpg",
    "COCONUT OIL": "https://m.media-amazon.com/images/I/61x5o-27GGL._AC_UF1000,1000_QL80_.jpg",
    "FROZEN VEGETABLES": "https://dailydelight.com/wp-content/uploads/2023/09/Jackfruit-Cake.png",
    "JAM": "https://m.media-amazon.com/images/I/71lF8Fv7lHL._AC_UF1000,1000_QL80_.jpg",
    "PLUM CAKES": "http://i0.wp.com/elitefoods.co.in/img/product/plum-cakes/Plum%20Surprise%20680g%20-%208906009990125%20-%20Front.png?w=1000"
};

async function updateCategoryImages() {
    try {
        const response = await axios.get(baseUrl + '/products/categories', {
            params: {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret,
                per_page: 100
            }
        });
        const categories = response.data;
        
        for (const cat of categories) {
            let foundImg = '';
            for (const [key, url] of Object.entries(catImages)) {
                if (cat.name.toUpperCase().includes(key)) {
                    foundImg = url;
                    break;
                }
            }
            
            if (foundImg) {
                console.log('Updating category image:', cat.name);
                await axios.put(baseUrl + '/products/categories/' + cat.id, {
                    image: { src: foundImg }
                }, {
                    params: {
                        consumer_key: consumerKey,
                        consumer_secret: consumerSecret
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error updating category images:', error.message);
    }
}

updateCategoryImages();
