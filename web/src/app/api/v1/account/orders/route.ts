import { auth } from "@/lib/auth";
import { db } from "@/db";
import { customer, order, orderLineItem, product, image, imageToProduct } from "@/db/schema";
import { eq, inArray, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Find customers with matching email
  const customers = await db
    .select()
    .from(customer)
    .where(eq(customer.email, session.user.email));

  if (customers.length === 0) {
    return NextResponse.json([]);
  }

  const customerIds = customers.map((c) => c.id);

  // Get all orders for these customers
  const orders = await db
    .select()
    .from(order)
    .where(inArray(order.customerId, customerIds))
    .orderBy(desc(order.createdDate));

  if (orders.length === 0) {
    return NextResponse.json([]);
  }

  // Get line items for all orders
  const orderIds = orders.map((o) => o.id);
  const lineItems = await db
    .select()
    .from(orderLineItem)
    .where(inArray(orderLineItem.orderId, orderIds));

  // Get products
  const productIds = [...new Set(lineItems.map((li) => li.productId))];
  const products =
    productIds.length > 0
      ? await db.select().from(product).where(inArray(product.id, productIds))
      : [];

  // Get product images
  const imgLinks =
    productIds.length > 0
      ? await db.select().from(imageToProduct).where(inArray(imageToProduct.b, productIds))
      : [];
  const imgIds = [...new Set(imgLinks.map((l) => l.a))];
  const images =
    imgIds.length > 0
      ? await db.select().from(image).where(inArray(image.id, imgIds))
      : [];

  // Assemble response
  const result = orders.map((o) => ({
    ...o,
    lineItems: lineItems
      .filter((li) => li.orderId === o.id)
      .map((li) => {
        const p = products.find((p) => p.id === li.productId);
        const pImages = imgLinks
          .filter((l) => l.b === li.productId)
          .map((l) => images.find((i) => i.id === l.a))
          .filter(Boolean);
        return {
          ...li,
          product: p ? { ...p, images: pImages } : null,
        };
      }),
  }));

  return NextResponse.json(result);
}
