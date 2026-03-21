import { getProductBySlug, getProducts } from '@/lib/woocommerce';
import ProductClient from './ProductClient';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock data as fallback for development if WooCommerce is not fully connected
const getMockProduct = (slug: string) => ({
  id: 101,
  name: 'Kerala Matta Rice - Premium Double Horse (10kg)',
  price: 18.50,
  regular_price: '22.00',
  categories: [{ name: 'Rice & Grains', slug: 'rice', id: 1 }],
  images: [{ src: '/matta-rice.png' }],
  description: '<p>Authentic Kerala Matta Rice, also known as Rosematta rice, is locally grown in the Palakkad district of Kerala. This premium Double Horse variety is parboiled with the husk, making it more nutritious than white rice. It has a unique robust earthy flavor and a coarse texture that is perfect for traditional Kerala meals.</p>',
  short_description: 'Authentic Palakkad Variety, Rich in Minerals & Nutrients, Naturally Gluten-Free, Premium Double Horse Quality',
  slug: slug,
  average_rating: '4.9',
  rating_count: 124,
  stock_status: 'instock'
});

const getMockRelated = () => [
  { id: 2, name: 'Double Horse Jeerakasala Rice', price: 18.00, regular_price: '20.00', images: [{ src: '/matta-rice.png' }], categories: [{ name: 'Rice & Grains' }], slug: 'jeerakasala-rice' },
  { id: 3, name: 'India Gate Basmati Rice', price: 22.50, regular_price: '24.50', images: [{ src: '/matta-rice.png' }], categories: [{ name: 'Rice & Grains' }], slug: 'basmati-rice' },
  { id: 4, name: 'Pavizham Brown Rice', price: 14.50, regular_price: '17.00', images: [{ src: '/matta-rice.png' }], categories: [{ name: 'Rice & Grains' }], slug: 'brown-rice' },
  { id: 10, name: 'Homemade Mango Pickle', price: 4.50, images: [{ src: '/mango-pickle.png' }], categories: [{ name: 'Pickles' }], slug: 'mango-pickle' }
];

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let product;
  let relatedProducts = [];

  try {
    product = await getProductBySlug(slug);
    
    if (product && product.categories && product.categories.length > 0) {
      // Fetch related products from the same category
      const categoryId = product.categories[0].id;
      const related = await getProducts({ 
        category: categoryId, 
        per_page: 4,
        exclude: [product.id]
      });
      relatedProducts = related;
    }
  } catch (error) {
    console.error('Failed to fetch product or related products:', error);
  }

  // Fallback for development
  if (!product) {
    product = getMockProduct(slug);
    relatedProducts = getMockRelated();
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProductClient product={product} relatedProducts={relatedProducts} />
      <Footer />
    </main>
  );
}
