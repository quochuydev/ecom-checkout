import React from "react";
import Categories from "@/ui/categories";
import { prisma } from "@/lib/prisma";
import { Product } from "@ecom/types/types";

export default async function Page() {
  const [products, productCategories] = await Promise.all([
    prisma.product.findMany({
      where: {},
      include: {
        images: true,
        productCategories: true,
      },
    }),
    prisma.productCategory.findMany({
      include: {
        image: true,
      },
    }),
  ]).catch(() => [[], []]);

  return (
    <Categories
      products={products as Product[]}
      productCategories={productCategories}
    />
  );
}
