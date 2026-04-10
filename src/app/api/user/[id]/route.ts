import { NextResponse } from "next/server";
import { updateCustomer, getCustomer } from "@/lib/woocommerce";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    const response = await getCustomer(userId);

    if (response.data) {
      return NextResponse.json({
        success: true,
        data: response.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch customer data",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    const updateData = await request.json();
    const response = await updateCustomer(userId, updateData);

    if (response.data) {
      return NextResponse.json({
        success: true,
        data: response.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to update customer data",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
