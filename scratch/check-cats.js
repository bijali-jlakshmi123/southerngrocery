const { api } = require('./src/lib/woocommerce');

async function checkCategories() {
  const categories = await api.get('products/categories', { per_page: 100 });
  console.log('Categories:', categories.data.map(c => c.name));
  const tags = await api.get('products/tags', { per_page: 100 });
  console.log('Tags:', tags.data.map(t => t.name));
}

checkCategories();
