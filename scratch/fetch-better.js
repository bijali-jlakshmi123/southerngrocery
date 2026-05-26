const urls = [
  'https://southernspicesstore.com/product/matta-rice',
  'https://southernspicesstore.com/product/jeerakasala-rice',
  'https://southernspicesstore.com/product/basmati-rice',
  'https://southernspicesstore.com/product/brown-rice'
];

async function fetchAll() {
  for (const url of urls) {
    const r = await fetch(url);
    const t = await r.text();
    // find all image urls
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const images = [];
    while ((match = imgRegex.exec(t)) !== null) {
      images.push(match[1]);
    }
    console.log(`\nURL: ${url}`);
    console.log(images.filter(img => img.includes('rice') || img.includes('Rice')).join('\n'));
  }
}

fetchAll();
