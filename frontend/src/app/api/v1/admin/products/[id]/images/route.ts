import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { image, imageToProduct } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  files: z.array(
    z.object({
      fileName: z.string().min(1),
      url: z.string().url(),
    })
  ).min(1),
});

async function requireAdmin() {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return null;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { id } = await params;
    const body = schema.parse(await request.json());

    await db.delete(imageToProduct).where(eq(imageToProduct.b, id));

    for (const file of body.files) {
      const [newImage] = await db
        .insert(image)
        .values({ fileName: file.fileName, url: file.url })
        .returning();
      await db.insert(imageToProduct).values({ a: newImage.id, b: id });
    }

    return NextResponse.json({});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
