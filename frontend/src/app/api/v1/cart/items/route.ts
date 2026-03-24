import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cart, cartLineItem } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  productId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    if (!cartId) return NextResponse.json({ message: "cartId is required" }, { status: 400 });

    const body = schema.parse(await request.json());

    const [foundCart] = await db.select().from(cart).where(eq(cart.id, cartId));
    if (!foundCart) return NextResponse.json({ message: "cart not found" }, { status: 404 });

    const [existing] = await db
      .select()
      .from(cartLineItem)
      .where(and(eq(cartLineItem.cartId, cartId), eq(cartLineItem.productId, body.productId)));

    if (existing) {
      const quantity = existing.quantity + 1;
      await db
        .update(cartLineItem)
        .set({ quantity, totalPrice: quantity * existing.price })
        .where(eq(cartLineItem.id, existing.id));
    } else {
      await db.insert(cartLineItem).values({
        cartId,
        productId: body.productId,
        quantity: 1,
        price: 2.5,
        totalPrice: 2.5,
      });
    }

    return NextResponse.json({});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
