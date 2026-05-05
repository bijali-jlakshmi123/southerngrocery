import 'dotenv/config';
import { getProductBySlug } from './src/lib/woocommerce.ts';
import fs from 'fs';

async function test() {
  const product = await getProductBySlug('nenthra-pazham');
  fs.writeFileSync('nenthra.json', JSON.stringify(product, null, 2));
}

test();
