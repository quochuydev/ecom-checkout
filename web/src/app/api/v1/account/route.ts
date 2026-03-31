import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [profile] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));

  if (!profile) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: profile.id,
    name: profile.name,
    email: profile.email,
    image: profile.image,
  });
}

export async function PUT(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  await db
    .update(user)
    .set({ name: name.trim(), updatedAt: new Date() })
    .where(eq(user.id, session.user.id));

  return NextResponse.json({ success: true });
}
