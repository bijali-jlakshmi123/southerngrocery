const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function download(url, filePath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.google.com/'
      }
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Failed to download ${url}: ${error.message}`);
    throw error;
  }
}

async function start() {
  const assets = [
    { url: 'https://eastern.in/wp-content/uploads/2025/02/Eastern-Logo-withTM.png', file: 'd:/Bijali/southernspices/public/brands/eastern_clean.png' },
    { url: 'https://www.tilda.com/wp-content/uploads/2021/04/Tilda_logo.png', file: 'd:/Bijali/southernspices/public/brands/tilda_clean.png' }
  ];

  for (const asset of assets) {
    console.log(`Downloading ${asset.url}...`);
    try {
      await download(asset.url, asset.file);
      console.log(`Success: ${asset.file}`);
    } catch (e) {}
  }
}

start();
