import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { cart, cartLineItem, product, image, imageToProduct } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    let result;
    if (cartId) {
      const existing = await getCartWithItems(cartId);
      if (existing) {
        result = existing;
      }
    }
    if (!result) {
      const [newCart] = await db.insert(cart).values({ amount: 0 }).returning();
      result = { ...newCart, lineItems: [], totalQuantity: 0 };
    }

    const response = NextResponse.json(result);
    response.cookies.set("cartId", result.id, { httpOnly: true, sameSite: "lax", path: "/" });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({});
  response.cookies.set("cartId", "", { maxAge: 0, httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}

async function getCartWithItems(cartId: string) {
  const [found] = await db.select().from(cart).where(eq(cart.id, cartId));
  if (!found) return null;

  const lineItems = await db.select().from(cartLineItem).where(eq(cartLineItem.cartId, cartId));
  const productIds = lineItems.map((li) => li.productId);
  const products = productIds.length > 0
    ? await db.select().from(product).where(inArray(product.id, productIds))
    : [];

  const imageLinks = productIds.length > 0
    ? await db.select().from(imageToProduct).where(inArray(imageToProduct.b, productIds))
    : [];
  const imageIds = imageLinks.map((l) => l.a);
  const images = imageIds.length > 0
    ? await db.select().from(image).where(inArray(image.id, imageIds))
    : [];

  const lineItemsWithProducts = lineItems.map((li) => {
    const prod = products.find((p) => p.id === li.productId)!;
    const prodImageIds = imageLinks.filter((l) => l.b === li.productId).map((l) => l.a);
    const prodImages = images.filter((img) => prodImageIds.includes(img.id));
    return { ...li, product: { ...prod, images: prodImages } };
  });

  const totalQuantity = lineItemsWithProducts.reduce((sum, li) => sum + li.quantity, 0);
  return { ...found, lineItems: lineItemsWithProducts, totalQuantity };
}
