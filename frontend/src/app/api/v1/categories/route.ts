import { NextResponse } from "next/server";
import { db } from "@/db";
import { image, productCategory } from "@/db/schema";
import { inArray } from "drizzle-orm";

export async function GET() {
  try {
    const categories = await db.select().from(productCategory);
    const imageIds = categories.map((c) => c.imageId).filter((id): id is string => id !== null);
    const images = imageIds.length > 0
      ? await db.select().from(image).where(inArray(image.id, imageIds))
      : [];

    const items = categories.map((c) => ({
      ...c,
      image: images.find((img) => img.id === c.imageId) ?? null,
    }));

    return NextResponse.json({ items });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
