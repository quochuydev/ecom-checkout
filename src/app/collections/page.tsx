import React from 'react';
import Collections from '@/ui/collections';
import { prisma } from '@/lib/prisma';
import { Product } from '@/types/types';

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

  console.log(`debug:products`, products);

  return (
    <Collections
      products={products as Product[]}
      productCategories={productCategories}
    />
  );
}
