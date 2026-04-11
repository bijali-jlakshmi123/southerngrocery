const axios = require('axios');
require('dotenv').config();

const ck = "ck_1a60b11d9b356f93a64d72272e98dddb21e99165";
const cs = "cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe";
const baseUrl = "https://srv1565389.hstgr.cloud/wp-json/wc/v3/products/categories";

async function test() {
  try {
    const res = await axios.get(`${baseUrl}?consumer_key=${ck}&consumer_secret=${cs}&per_page=100&hide_empty=true`);
    console.log(JSON.stringify(res.data.map(c => ({ id: c.id, name: c.name, slug: c.slug, parent: c.parent })), null, 2));
  } catch (err) {
    console.error(err.message);
  }
}

test();
