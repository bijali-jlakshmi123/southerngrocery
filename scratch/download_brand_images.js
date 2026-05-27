const axios = require('axios');
const fs = require('fs');

const images = [
  { slug: "jeerakasala-rice", url: "https://www.keralataste.com/cdn/shop/products/JeerakasalaRiceDoubleHorse_800x.jpg" },
  { slug: "basmati-rice", url: "https://www.keralataste.com/cdn/shop/products/IndiaGateBasmatiRice_800x.jpg?v=1610116617" },
  { slug: "brown-rice", url: "https://www.keralataste.com/cdn/shop/products/PavizhamBrownRice_800x.jpg" }
];

async function downloadImages() {
  for (const img of images) {
    try {
      console.log(`Downloading ${img.slug}...`);
      const response = await axios({
        url: img.url,
        method: 'GET',
        responseType: 'stream',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const writer = fs.createWriteStream(`scratch/${img.slug}-brand.jpg`);
      response.data.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
      console.log(`Successfully downloaded ${img.slug}`);
    } catch (e) {
      console.error(`Failed to download ${img.slug}: ${e.message}`);
    }
  }
}

downloadImages();
