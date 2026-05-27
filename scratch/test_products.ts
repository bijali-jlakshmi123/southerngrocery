import { getProducts } from "../src/lib/woocommerce";

async function run() {
  const products = await getProducts({ on_sale: true, per_page: 5 });
  console.log(`Found ${products.length} on sale products`);
  products.forEach(p => {
    console.log(`ID: ${p.id}, name: ${p.name}, price: ${p.price}, regular_price: ${p.regular_price}, sale_price: ${p.sale_price}, on_sale: ${p.on_sale}`);
  });
}
run();
