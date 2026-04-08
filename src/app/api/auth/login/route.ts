import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const wpUrl = (
      process.env.WORDPRESS_URL || "https://southernspicesstore.com"
    ).replace(/\/$/, "");

    const wpAuthKey = process.env.WP_AUTH_KEY || "southernspices2026";

    // Convert email to username
    const username = body.email.includes("@")
      ? body.email.split("@")[0]
      : body.email;

    const url = `${wpUrl}/?rest_route=/simple-jwt-login/v1/auth`;

    console.log("LOGIN URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify({
        username,
        password: body.password,
        AUTH_KEY: wpAuthKey,
      }),
    });

    const text = await response.text();

    console.log("WP LOGIN STATUS:", response.status);
    console.log("WP LOGIN RESPONSE:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid response from WordPress",
          details: text,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("LOGIN API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to communicate with WordPress",
      },
      { status: 500 },
    );
  }
}
