import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cart, cartLineItem, customer, order, orderLineItem } from "@/db/schema";
import { sendOrderNotification } from "@/lib/email";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  contact: z.object({
    email: z.string().email(),
  }),
  shipping: z.object({
    firstName: z.string().min(1),
    lastName: z.string().optional(),
    address: z.string().optional(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    if (!cartId) return NextResponse.json({ message: "cartId is required" }, { status: 400 });

    const body = schema.parse(await request.json());

    const [foundCart] = await db.select().from(cart).where(eq(cart.id, cartId));
    if (!foundCart) return NextResponse.json({ message: "cart not found" }, { status: 404 });

    const lineItems = await db.select().from(cartLineItem).where(eq(cartLineItem.cartId, cartId));

    const [newCustomer] = await db
      .insert(customer)
      .values({ email: body.contact.email, firstName: body.shipping.firstName })
      .returning();

    const [newOrder] = await db
      .insert(order)
      .values({ customerId: newCustomer.id, amount: foundCart.amount, status: "Pending", note: "" })
      .returning();

    if (lineItems.length > 0) {
      await db.insert(orderLineItem).values(
        lineItems.map((li) => ({
          orderId: newOrder.id,
          productId: li.productId,
          quantity: li.quantity,
          price: li.price,
          totalPrice: li.totalPrice,
        }))
      );
    }

    sendOrderNotification({
      orderId: newOrder.id,
      customerEmail: body.contact.email,
      customerName: body.shipping.firstName,
      amount: foundCart.amount,
      itemCount: lineItems.length,
    }).catch(() => {});

    return NextResponse.json({ orderId: newOrder.id });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
