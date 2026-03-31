import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { customer } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [found] = await db.select().from(customer).where(eq(customer.id, id));
    if (!found) return NextResponse.json({ message: "customer not found" }, { status: 404 });
    return NextResponse.json({ id: found.id, firstName: found.firstName, email: found.email });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
