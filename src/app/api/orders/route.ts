import { NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    if (!orderData || !orderData.line_items) {
      return NextResponse.json(
        { success: false, error: "Empty order data" },
        { status: 400 },
      );
    }

    console.log(
      "Creating order with data:",
      JSON.stringify(orderData, null, 2),
    );

    const response = await createOrder(orderData);

    if (response.data) {
      return NextResponse.json({
        success: true,
        data: response.data,
      });
    } else {
      console.error(`[ORDER FAIL] WooCommerce rejected the order:`, response.error);
      return NextResponse.json(
        {
          success: false,
          error: response.error || "Failed to create order in WooCommerce",
        },
        { status: 400 },
      );
    }
  } catch (error: any) {
    console.error("ORDER API ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
