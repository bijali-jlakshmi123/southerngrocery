import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const wpUrl = (
      process.env.WORDPRESS_URL ||
      "https://southernspicesstore.com"
    ).replace(/\/$/, "");

    const wpAuthKey =
      process.env.WP_AUTH_KEY || "southernspices2026";

    // IMPORTANT: use email directly
    const username = body.email;

    // Try auth endpoint
    const url = `${wpUrl}/?rest_route=/simple-jwt-login/v1/auth`;

    console.log("LOGIN URL:", url);
    console.log("USERNAME:", username);
    console.log("PASSWORD:", body.password);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: body.password,
        AUTH_KEY: wpAuthKey,
      }),
    });

    const text = await response.text();

    console.log("WP STATUS:", response.status);
    console.log("WP RAW RESPONSE:", text);

    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        success: false,
        message: text,
      };
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Login failed",
      },
      { status: 500 }
    );
  }
}