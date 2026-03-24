import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().min(0).optional(),
  regularPrice: z.number().min(0).optional(),
});

async function requireAdmin() {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { id } = await params;
    const body = schema.parse(await request.json());

    const fields: Record<string, any> = {};
    if (body.title !== undefined) fields.title = body.title;
    if (body.description !== undefined) fields.description = body.description;
    if (body.sku !== undefined) fields.sku = body.sku;
    if (body.price !== undefined) fields.price = body.price;
    if (body.regularPrice !== undefined) fields.regularPrice = body.regularPrice;

    if (Object.keys(fields).length > 0) {
      await db.update(product).set(fields).where(eq(product.id, id));
    }
    return NextResponse.json({});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
