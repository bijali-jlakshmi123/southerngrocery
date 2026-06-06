import { NextResponse } from "next/server";
import { getCustomerOrders } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || undefined;
    
    const response = await getCustomerOrders(userId, email);

    if (response.data) {
      return NextResponse.json({
        success: true,
        data: response.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch orders",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("USER ORDERS API ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
