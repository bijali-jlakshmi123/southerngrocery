import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const wpUrl = (
      process.env.WORDPRESS_URL || "https://srv1565389.hstgr.cloud"
    ).replace(/\/$/, "");

    const wpAuthKey = process.env.WP_AUTH_KEY || "southernspices2026";

    const response = await fetch(
      `${wpUrl}/?rest_route=/simple-jwt-login/v1/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
          AUTH_KEY: wpAuthKey,
        }),
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Login failed",
      },
      { status: 500 },
    );
  }
}
