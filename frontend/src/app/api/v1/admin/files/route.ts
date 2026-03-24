import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { image } from "@/db/schema";
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

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = schema.parse(await request.json());
    await db.insert(image).values(body.files);
    return NextResponse.json({});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
