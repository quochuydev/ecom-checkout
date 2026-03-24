import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cartLineItem } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const updateSchema = z.object({
  quantity: z.number().int().min(1),
});

type Params = { params: Promise<{ productId: string }> };

export async function DELETE(_request: NextRequest, { params }: Params) {
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

    await db.delete(cartLineItem).where(eq(cartLineItem.id, existing.id));
    return NextResponse.json({});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    if (!cartId) return NextResponse.json({ message: "cartId is required" }, { status: 400 });

    const { productId } = await params;
    const body = updateSchema.parse(await request.json());

    const [existing] = await db
      .select()
      .from(cartLineItem)
      .where(and(eq(cartLineItem.cartId, cartId), eq(cartLineItem.productId, productId)));
    if (!existing) return NextResponse.json({ message: "item not found" }, { status: 404 });

    await db.update(cartLineItem).set({ quantity: body.quantity }).where(eq(cartLineItem.id, existing.id));
    return NextResponse.json({});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
