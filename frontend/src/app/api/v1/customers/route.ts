import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { customer } from "@/db/schema";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());
    const [newCustomer] = await db
      .insert(customer)
      .values({ email: body.email, firstName: body.firstName })
      .returning();
    return NextResponse.json({ id: newCustomer.id });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
