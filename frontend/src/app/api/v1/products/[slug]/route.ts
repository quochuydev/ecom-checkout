import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { image, imageToProduct, product } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [found] = await db.select().from(product).where(eq(product.slug, slug));
    if (!found) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const imageLinks = await db.select().from(imageToProduct).where(eq(imageToProduct.b, found.id));
    const imageIds = imageLinks.map((l) => l.a);
    const images = imageIds.length > 0
      ? await db.select().from(image).where(inArray(image.id, imageIds))
      : [];

    return NextResponse.json({ ...found, images });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
