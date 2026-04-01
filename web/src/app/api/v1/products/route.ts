import { NextResponse } from "next/server";
import { db } from "@/db";
import { image, imageToProduct, product } from "@/db/schema";
import { inArray, isNull } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await db.select().from(product).where(isNull(product.deletedAt));
    const productIds = products.map((p) => p.id);

    const imageLinks = productIds.length > 0
      ? await db.select().from(imageToProduct).where(inArray(imageToProduct.b, productIds))
      : [];
    const imageIds = imageLinks.map((l) => l.a);
    const images = imageIds.length > 0
      ? await db.select().from(image).where(inArray(image.id, imageIds))
      : [];

    const items = products.map((p) => ({
      ...p,
      images: imageLinks.filter((l) => l.b === p.id).map((l) => images.find((img) => img.id === l.a)!).filter(Boolean),
    }));

    return NextResponse.json({ items });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
