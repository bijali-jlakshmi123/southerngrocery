const urls = [
  "https://southernspicesstore.com/product/matta-rice",
  "https://southernspicesstore.com/product/jeerakasala-rice",
  "https://southernspicesstore.com/product/basmati-rice",
  "https://southernspicesstore.com/product/brown-rice"
];

async function fetchImages() {
  for (const url of urls) {
    const res = await fetch(url);
    const html = await res.text();
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    console.log(`Images for ${url}:`);
    while ((match = imgRegex.exec(html)) !== null) {
      console.log(match[1]);
    }
  }
}

fetchImages();
