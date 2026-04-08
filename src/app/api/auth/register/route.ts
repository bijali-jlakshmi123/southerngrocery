import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const wpUrl = (
      process.env.WORDPRESS_URL || "https://southernspicesstore.com"
    ).replace(/\/$/, "");

    const wpAuthKey = process.env.WP_AUTH_KEY || "southernspices2026";

    // Try the /users endpoint as requested
    const url = `${wpUrl}/index.php?rest_route=/simple-jwt-login/v1/users&email=${encodeURIComponent(body.email)}&password=${encodeURIComponent(body.password)}&AUTH_KEY=${encodeURIComponent(wpAuthKey)}&first_name=${encodeURIComponent(body.first_name || "")}&last_name=${encodeURIComponent(body.last_name || "")}&user_login=${encodeURIComponent(body.user_login || body.email.split('@')[0])}`;

    console.log("Attempting WordPress Register at:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();
    
    console.log("WordPress Response Status:", response.status);
    console.log("WordPress Response Body:", text);

    if (contentType.includes("application/json")) {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(
      { success: false, message: "Invalid response from WordPress", details: text },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("Register API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to communicate with WordPress",
      },
      { status: 500 },
    );
  }
}
