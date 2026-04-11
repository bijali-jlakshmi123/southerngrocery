
const axios = require('axios');

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const url = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3/products';

async function testApi() {
  try {
    const response = await axios.get(url, {
      params: {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret
      }
    });
    console.log('Success:', response.data.length, 'products found');
  } catch (error) {
    if (error.response) {
      console.log('Error Status:', error.response.status);
      console.log('Error Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error Message:', error.message);
    }
  }
}

testApi();
