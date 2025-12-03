import React from "react";
import { prisma } from "@/lib/prisma";
import Dashboard from "@/ui/admin/dashboard";
import { Product } from "@ecom/types";

export default async function Page() {
  return <Dashboard />;
}
