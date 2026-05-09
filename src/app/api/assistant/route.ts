import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/woocommerce";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key");

export async function POST(req: Request) {
  try {
    const { message, imageBase64 } = await req.json();

    // Warn if dummy key
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set. Using fallback mock response.");
      // Fallback search mock if API key is not present
      const fallbackProducts = await getProducts({ search: message || "rice" });
      return NextResponse.json({
        message: "I am using a fallback search because the Gemini API key is missing. Here are some matches for your query:",
        products: fallbackProducts.slice(0, 4),
        parameters: { searchQuery: message }
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const promptContext = `
    You are a friendly and helpful AI Shopping Assistant for an Indian and Kerala grocery store called Southern Spices in the UK.
    Your goal is to understand the user's shopping request and extract parameters to search our database.
    
    If the user uploaded an image, analyze it to see what grocery item it is.
    If the user provided text, understand their intent.

    Extract the following if possible:
    - searchQuery: A clean search term to find matching products (e.g., if user says "suggest a rice under £20", searchQuery could be "rice" or "matta rice").
    - maxPrice: Maximum budget mentioned as a number (e.g. 20).
    - minPrice: Minimum budget mentioned.
    - category: The product category mentioned (e.g., rice, spices, snacks).

    Return ONLY a JSON object exactly like this, no markdown formatting:
    {
      "searchQuery": "string or null",
      "maxPrice": number or null,
      "minPrice": number or null,
      "category": "string or null",
      "replyMessage": "A friendly short message acknowledging their request. Ex: 'Looking for rice under £20...'"
    }
    `;

    let result;
    if (imageBase64) {
      // Remove data:image/...;base64, prefix if present
      const base64Data = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;
      result = await model.generateContent([
        promptContext,
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg"
          }
        },
        message || "What product is this?"
      ]);
    } else {
      result = await model.generateContent([promptContext, message]);
    }

    const responseText = result.response.text();
    let searchParams: any = { searchQuery: "spices", replyMessage: "Let me check that for you." };
    
    try {
      let jsonStr = responseText;
      const jsonMatch = responseText.match(/```(?:json)?\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      searchParams = JSON.parse(jsonStr.trim());
    } catch (e) {
      console.error("JSON parse error from Gemini", e);
      searchParams = { searchQuery: message, replyMessage: "Here is what I found:" };
    }

    // Now, fetch products from WooCommerce using the extracted parameters
    let wcParams: any = {};
    if (searchParams.searchQuery) wcParams.search = searchParams.searchQuery;
    
    const products = await getProducts(wcParams);

    // If no products found, maybe drop the search param and get general ones
    let finalProducts = products;
    if (finalProducts.length === 0 && searchParams.searchQuery) {
      const allProds = await getProducts({ per_page: 10 });
      finalProducts = allProds;
      searchParams.replyMessage = `I couldn't find an exact match for "${searchParams.searchQuery}", but here are some popular items:`;
    }

    return NextResponse.json({
      message: searchParams.replyMessage || "Here are some recommendations for you.",
      products: finalProducts.slice(0, 4), // Return top 4
      parameters: searchParams
    });

  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
