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
    const metaMatch = t.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
    console.log(`URL: ${url}`);
    if (metaMatch) {
      console.log(`OG Image: ${metaMatch[1]}`);
    } else {
      console.log('No OG Image');
    }
  }
}

fetchAll();
