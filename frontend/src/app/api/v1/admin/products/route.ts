import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { image, imageToProduct, product } from "@/db/schema";
import { inArray } from "drizzle-orm";
import slugify from "slugify";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().min(0),
  regularPrice: z.number().min(0),
});

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
    const products = await db.select().from(product);
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

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = createSchema.parse(await request.json());
    const [result] = await db
      .insert(product)
      .values({
        title: body.title,
        description: body.description,
        sku: body.sku,
        price: body.price,
        regularPrice: body.regularPrice,
        slug: slugify(body.title.toLowerCase()),
      })
      .returning();
    return NextResponse.json({ id: result.id });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
