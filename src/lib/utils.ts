
export function mapWcProduct(wcProduct: any) {
  const categories = wcProduct.categories || [];
  const mainCategory = categories[0]?.name || "Uncategorized";
  let subCategory = categories.length > 1 ? categories[1]?.name : null;
  const name = wcProduct.name || "";

  // Smarter subcategory mapping based on keywords
  if (!subCategory || subCategory === mainCategory) {
    if (name.toLowerCase().includes("matta")) subCategory = "Matta Rice";
    else if (name.toLowerCase().includes("kaima") || name.toLowerCase().includes("jeerakasala")) subCategory = "Kaima Rice";
    else if (name.toLowerCase().includes("basmati")) subCategory = "Basmati Rice";
    else if (name.toLowerCase().includes("ponni")) subCategory = "Ponni Rice";
    else if (name.toLowerCase().includes("atta")) subCategory = "Atta";
    else if (name.toLowerCase().includes("roasted")) subCategory = "Roasted Powder";
    else if (name.toLowerCase().includes("idli") || name.toLowerCase().includes("dosa")) subCategory = "Breakfast Mix";
    else if (name.toLowerCase().includes("coconut oil")) subCategory = "Coconut Oil";
    else if (name.toLowerCase().includes("ghee")) subCategory = "Ghee";
    else if (name.toLowerCase().includes("pickle")) subCategory = "Pickles";
    else if (name.toLowerCase().includes("chips")) subCategory = "Kerala Snacks";
  }
  
  // Find brand from attributes or common brands in name
  const brandAttr = wcProduct.attributes?.find((a: any) => a.name.toLowerCase() === 'brand');
  let brand = brandAttr?.options?.[0] || null;
  
  if (!brand) {
    const brands = ["Double Horse", "Eastern", "Ajmi", "Nirapara", "Brahmins", "Tilda", "Aashirvad", "Pillsbury", "Himalayan", "KTC", "Pavizham"];
    brand = brands.find(b => name.toLowerCase().includes(b.toLowerCase())) || null;
  }

  // Ensure image is a valid URL or fallback to placeholder
  let image = "/placeholder.png";
  if (wcProduct.images && wcProduct.images.length > 0) {
    const src = wcProduct.images[0].src;
    // Some systems export literal 'image' as a placeholder - ignore it
    if (src && src !== 'image' && src !== '') {
      image = src;
    }
  }

  return {
    id: wcProduct.id,
    name: name,
    price: parseFloat(wcProduct.price) || 0,
    originalPrice: parseFloat(wcProduct.regular_price) || 0,
    image: image,
    category: mainCategory,
    subCategory: subCategory,
    brand: brand,
    slug: wcProduct.slug,
  };
}


