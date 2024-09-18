import React from "react";
import Orders from "@/ui/admin/orders";
import { prisma } from "@/lib/prisma";
import { Order } from "@ecom/types";

export default async function Page() {
  const orders = await prisma.order.findMany({});

  return <Orders orders={orders as Order[]} />;
}
