import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { customer, order, orderLineItem } from "@/db/schema";
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
    const orders = await db.select().from(order);
    const orderIds = orders.map((o) => o.id);
    const lineItems = orderIds.length > 0
      ? await db.select().from(orderLineItem).where(inArray(orderLineItem.orderId, orderIds))
      : [];
    const customerIds = [...new Set(orders.map((o) => o.customerId))];
    const customers = customerIds.length > 0
      ? await db.select().from(customer).where(inArray(customer.id, customerIds))
      : [];

    const items = orders.map((o) => ({
      ...o,
      lineItems: lineItems.filter((li) => li.orderId === o.id),
      customer: customers.find((c) => c.id === o.customerId)!,
    }));

    return NextResponse.json({ items });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
