const wpUrl = (process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8000").replace(/\/$/, "");

export const getPosts = async (params: any = {}) => {
  // Ensure _embed is always set if not provided
  if (params._embed === undefined) params._embed = true;
  
  const query = new URLSearchParams(params).toString();
  const url = `${wpUrl}/wp-json/wp/v2/posts?${query}`;

  console.log(`[WordPress Connection Test] Fetching posts from: ${url}`);

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    // Check if the response is actually JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        console.error(`[WordPress Error] Expected JSON but received ${contentType} from ${url}. Check if your site is in 'Preview' mode or has a 'Coming Soon' page.`);
        return [];
    }

    if (!response.ok) {
        console.error(`[WordPress Error] HTTP Status: ${response.status} from ${url}`);
        return [];
    }
    return response.json();
  } catch (error: any) {
    console.error(`[WordPress Connection Failed] Cannot reach ${url}:`, error.message);
    return [];
  }
};

export const getPageBySlug = async (slug: string) => {
  const url = `${wpUrl}/wp-json/wp/v2/pages?slug=${slug}&_embed`;
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(`Error fetching WP page [${slug}]:`, error);
    return null;
  }
};
