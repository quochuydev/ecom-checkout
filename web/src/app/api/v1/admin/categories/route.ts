import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { image, productCategory } from "@/db/schema";
import { inArray } from "drizzle-orm";

async function requireAdmin() {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
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
