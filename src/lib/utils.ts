
export function mapWcProduct(wcProduct: any) {
  return {
    id: wcProduct.id,
    name: wcProduct.name,
    price: parseFloat(wcProduct.price) || 0,
    originalPrice: parseFloat(wcProduct.regular_price) || 0,
    image: wcProduct.images?.[0]?.src || "/placeholder.png",
    category: wcProduct.categories?.[0]?.name || "Uncategorized",
    slug: wcProduct.slug,
  };
}
