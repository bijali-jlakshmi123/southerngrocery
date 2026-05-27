import dotenv from 'dotenv';
dotenv.config();

import { api } from '../src/lib/woocommerce';

async function checkCategories() {
  const categories = await api.get('products/categories', { per_page: 100 });
  console.log('Categories:', categories.data.map((c: any) => c.name));
  const tags = await api.get('products/tags', { per_page: 100 });
  console.log('Tags:', tags.data.map((t: any) => t.name));
}

checkCategories();
