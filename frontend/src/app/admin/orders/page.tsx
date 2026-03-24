import React from "react";
import Orders from "@/ui/admin/orders";
import { db } from "@/db";
import { order, orderLineItem, customer } from "@/db/schema";
import { inArray } from "drizzle-orm";

export default async function Page() {
  const orders = await db.select().from(order);

  const orderIds = orders.map((o) => o.id);
  const lineItems = orderIds.length > 0
    ? await db.select().from(orderLineItem).where(inArray(orderLineItem.orderId, orderIds))
    : [];

  const customerIds = [...new Set(orders.map((o) => o.customerId))];
  const customers = customerIds.length > 0
    ? await db.select().from(customer).where(inArray(customer.id, customerIds))
    : [];

  const ordersWithRelations = orders.map((o) => ({
    ...o,
    lineItems: lineItems.filter((li) => li.orderId === o.id),
    customer: customers.find((c) => c.id === o.customerId)!,
  }));

  return <Orders orders={ordersWithRelations} />;
}
