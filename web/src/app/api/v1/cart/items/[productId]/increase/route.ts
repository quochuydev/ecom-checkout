import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cartLineItem } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    if (!cartId) return NextResponse.json({ message: "cartId is required" }, { status: 400 });

    const { productId } = await params;
    const [existing] = await db
      .select()
      .from(cartLineItem)
      .where(and(eq(cartLineItem.cartId, cartId), eq(cartLineItem.productId, productId)));
    if (!existing) return NextResponse.json({ message: "item not found" }, { status: 404 });

    await db
      .update(cartLineItem)
      .set({ quantity: existing.quantity + 1 })
      .where(eq(cartLineItem.id, existing.id));

    return NextResponse.json({});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
