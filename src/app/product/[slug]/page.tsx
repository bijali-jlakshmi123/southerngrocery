import { getProductBySlug, getProducts, getCategories } from '@/lib/woocommerce';
import { getProductImageSrc, type ProductImageSource } from '@/lib/utils';
import ProductClient from './ProductClient';

type ProductWithImages = ProductImageSource & {
  images?: ({ src?: string } & Record<string, unknown>)[];
  [key: string]: unknown;
};

// Mock data as fallback for development if WooCommerce is not fully connected
const getMockProduct = (slug: string) => {
  let imageSrc = '/matta-rice.png';
  let name = 'Double Horse Matta Rice 5kg';
  let price = 9.49;
  let regular_price = '12.99';
  let description = '<p>Authentic Kerala Matta Rice, also known as Rosematta rice, is locally grown in the Palakkad district of Kerala. This premium Double Horse variety is parboiled with the husk, making it more nutritious than white rice. It has a unique robust earthy flavor and a coarse texture that is perfect for traditional Kerala meals.</p>';
  let short_description = 'Authentic Palakkad Variety, Rich in Minerals & Nutrients, Naturally Gluten-Free, Premium Double Horse Quality (5kg)';

  if (slug === 'jeerakasala-rice') {
    imageSrc = '/jeerakasala-rice.png';
    name = 'Double Horse Jeerakasala Rice';
    price = 18.00;
    regular_price = '20.00';
    description = '<p>Premium quality Jeerakasala Rice, famous for its aroma and short grains. Perfect for making traditional Malabar Biriyani and Neychoru. Grown with care and processed to retain its natural fragrance.</p>';
    short_description = 'Aromatic Short Grain, Perfect for Biriyani, Premium Quality';
  } else if (slug === 'basmati-rice') {
    imageSrc = '/basmati-rice.png';
    name = 'India Gate Basmati Rice';
    price = 22.50;
    regular_price = '24.50';
    description = '<p>India Gate Basmati Rice is known for its long grains and rich aroma. Aged to perfection, this rice offers a non-sticky texture and a delightful taste, making it ideal for everyday use as well as special occasions.</p>';
    short_description = 'Long Grain, Aromatic, Aged to Perfection';
  } else if (slug === 'brown-rice') {
    imageSrc = '/brown-rice.png';
    name = 'Pavizham Brown Rice';
    price = 14.50;
    regular_price = '17.00';
    description = '<p>Pavizham Brown Rice offers the wholesome goodness of unpolished rice. Rich in fiber and essential nutrients, it is a healthier alternative for your daily meals, supporting a balanced diet and an active lifestyle.</p>';
    short_description = 'Unpolished, High Fiber, Wholesome Goodness';
  }

  return {
    id: slug === 'matta-rice' ? 101 : slug === 'jeerakasala-rice' ? 2 : slug === 'basmati-rice' ? 3 : 4,
    name,
    price,
    regular_price,
    categories: [{ name: 'Rice & Grains', slug: 'rice', id: 1 }],
    images: [{ src: imageSrc }],
    description,
    short_description,
    slug: slug,
    average_rating: '4.9',
    rating_count: 124,
    stock_status: 'instock'
  };
};

const getMockRelated = () => [
  { id: 2, name: 'Double Horse Jeerakasala Rice', price: 18.00, regular_price: '20.00', images: [{ src: '/jeerakasala-rice.png' }], categories: [{ name: 'Rice & Grains' }], slug: 'jeerakasala-rice' },
  { id: 3, name: 'India Gate Basmati Rice', price: 22.50, regular_price: '24.50', images: [{ src: '/basmati-rice.png' }], categories: [{ name: 'Rice & Grains' }], slug: 'basmati-rice' },
  { id: 4, name: 'Pavizham Brown Rice', price: 14.50, regular_price: '17.00', images: [{ src: '/brown-rice.png' }], categories: [{ name: 'Rice & Grains' }], slug: 'brown-rice' },
  { id: 10, name: 'Homemade Mango Pickle', price: 4.50, images: [{ src: '/mango-pickle.png' }], categories: [{ name: 'Pickles' }], slug: 'mango-pickle' }
];

const withResolvedProductImage = <T extends ProductWithImages | null>(product: T) => {
  if (!product) return product;

  const resolvedImage = getProductImageSrc(product);
  const [firstImage = {}, ...otherImages] = product.images || [];

  return {
    ...product,
    images: [{ ...firstImage, src: resolvedImage }, ...otherImages],
  };
};

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let product;
  let relatedProducts = [];
  let categories = [];

  try {
    const [fetchedProduct, fetchedCategories] = await Promise.all([
      getProductBySlug(slug),
      getCategories({ hide_empty: true })
    ]);
    
    product = withResolvedProductImage(fetchedProduct);
    categories = fetchedCategories;
    
    if (product && product.categories && product.categories.length > 0) {
      // Fetch related products from the same category
      const categoryId = product.categories[0].id;
      const related = await getProducts({ 
        category: categoryId, 
        per_page: 4,
        exclude: [product.id]
      });
      relatedProducts = related.map(withResolvedProductImage);
    }
  } catch (error) {
    console.error('Failed to fetch product or related products:', error);
  }

  // Fallback for development
  if (!product) {
    product = withResolvedProductImage(getMockProduct(slug));
    relatedProducts = getMockRelated().map(withResolvedProductImage);
  }

  return (
    <main className="min-h-screen">
      <ProductClient product={product} relatedProducts={relatedProducts} />
    </main>
  );
}
