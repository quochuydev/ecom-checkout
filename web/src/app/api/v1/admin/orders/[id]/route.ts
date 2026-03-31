import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { order } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  status: z.enum(["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"]).optional(),
  note: z.string().optional(),
}).refine((d) => d.status !== undefined || d.note !== undefined, {
  message: "At least one of status or note is required",
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
    if (body.status !== undefined) fields.status = body.status;
    if (body.note !== undefined) fields.note = body.note;

    await db.update(order).set(fields).where(eq(order.id, id));
    return NextResponse.json({});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
