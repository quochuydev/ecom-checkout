import React from "react";
import { prisma } from "@/lib/prisma";
import Products from "@/ui/admin/products";

export default async function Page() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  return <Products products={products} />;
}
