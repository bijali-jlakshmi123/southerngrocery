import { NextResponse } from "next/server";
import { getOrder } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await getOrder(id);

    if (response.data) {
      return NextResponse.json({
        success: true,
        data: response.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch order",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("ORDER API ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
