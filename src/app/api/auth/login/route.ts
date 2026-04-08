import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const wpUrl = (process.env.WORDPRESS_URL || "https://southernspicesstore.com").replace(/\/$/, "");

    const wpAuthKey = process.env.WP_AUTH_KEY || "southernspices2026";

    const response = await fetch(`${wpUrl}/?rest_route=/simple-jwt-login/v1/auth`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        ...body,
        AUTH_KEY: wpAuthKey
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    let data;
    
    if (contentType.includes("application/json")) {
       data = await response.json();
    } else {
       const text = await response.text();
       console.error("Non-JSON response from WordPress:", text);
       data = { success: false, message: "Invalid response from server" };
       return NextResponse.json(data, { status: 502 });
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Login API Route Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to communicate with WordPress" },
      { status: 500 }
    );
  }
}
