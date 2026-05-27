const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // Might need to install this

const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';
const wpMediaUrl = 'https://srv1565389.hstgr.cloud/wp-json/wp/v2/media';
const appPassAuth = 'Basic ' + Buffer.from('admin:Gj6s EPmb fAnj 3C9g MgUh v3P0').toString('base64');

async function searchImageDuckDuckGo(query) {
    try {
        const res = await axios.get('https://duckduckgo.com/html/', {
            params: { q: query + " grocery product image" },
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        const $ = cheerio.load(res.data);
        const images = [];
        $('img').each((i, el) => {
            const src = $(el).attr('src');
            if (src && src.startsWith('//')) images.push('https:' + src);
            else if (src && src.startsWith('http')) images.push(src);
        });
        // Duckduckgo HTML might not have actual images easily. Let's use Yahoo Image Search.
        return null;
    } catch(e) { return null; }
}

async function searchImageYahoo(query) {
    try {
        const res = await axios.get('https://images.search.yahoo.com/search/images', {
            params: { p: query + " product packaging" },
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        // Match JSON data in the HTML
        const match = res.data.match(/"imgurl":"([^"]+)"/);
        if (match && match[1]) return match[1].replace(/\\/g, '');
        return null;
    } catch(e) {
        return null;
    }
}

async function uploadToWordPress(url, name) {
    try {
        // Download image
        const imgRes = await axios({ url, method: 'GET', responseType: 'stream' });
        const filePath = path.join(__dirname, 'temp.jpg');
        const writer = fs.createWriteStream(filePath);
        imgRes.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // Upload to WP
        const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const uploadRes = await axios.post(wpMediaUrl, fs.readFileSync(filePath), {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="${safeName}.jpg"`,
                'Authorization': appPassAuth
            }
        });
        return uploadRes.data.id;
    } catch(e) {
        console.log("Upload failed for", name, e.message);
        return null;
    }
}

async function run() {
    let p = 1;
    let totalUpdated = 0;
    while(true) {
        const r = await axios.get(baseUrl + '/products', {
            params: { consumer_key: consumerKey, consumer_secret: consumerSecret, per_page: 50, page: p }
        });
        if(r.data.length === 0) break;

        const missing = r.data.filter(x => !x.images || x.images.length === 0 || x.images[0].src.includes('placeholder'));
        
        for (const prod of missing) {
            console.log(`Processing: ${prod.name}`);
            const imgUrl = await searchImageYahoo(prod.name);
            if (imgUrl) {
                console.log(`Found image for ${prod.name}: ${imgUrl}`);
                const mediaId = await uploadToWordPress(imgUrl, prod.name);
                if (mediaId) {
                    await axios.put(`${baseUrl}/products/${prod.id}`, {
                        images: [{ id: mediaId }]
                    }, { params: { consumer_key: consumerKey, consumer_secret: consumerSecret } });
                    console.log(`Successfully updated ${prod.name} with Media ID ${mediaId}`);
                    totalUpdated++;
                }
            } else {
                console.log(`Could not find image for ${prod.name}`);
            }
            // Sleep to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        p++;
        if (totalUpdated >= 15) break; // Limit for this test run
    }
    console.log(`Done! Updated ${totalUpdated} products.`);
}

run();
