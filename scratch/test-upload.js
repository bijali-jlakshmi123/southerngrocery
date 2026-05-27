const axios = require('axios');
const fs = require('fs');

async function run() {
  try {
    fs.writeFileSync('test.txt', 'hello');
    const r = await axios.post('https://srv1565389.hstgr.cloud/wp-json/wp/v2/media', fs.readFileSync('test.txt'), {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="test.txt"',
        Authorization: 'Basic ' + Buffer.from('admin:ic$Ar21o(JLupnWp5dbRTAZA').toString('base64')
      }
    });
    console.log('Success:', r.data.id);
  } catch(e) {
    console.error('Error:', e.response?.data || e.message);
  }
}
run();
