import React from 'react';
import ProductUI from '@/ui/product';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Product } from '@/types/api';

export default async function Page({ params: { slug } }: any) {
  const product = await prisma.product
    .findFirst({
      where: {
        slug,
      },
      include: {
        images: true,
      },
    })
    .catch(() => null);

  if (!product) redirect('/');

  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  console.log(`debug:product`, product);

  return (
    <ProductUI
      product={product as Product}
      relatedProducts={products
        .map((e) => ({
          id: e.id,
          name: e.name,
          price: e.price,
          href: `/products/${e.slug}`,
          imageSrc: e.images?.[0]?.src,
          imageAlt: e.images?.[0]?.alt,
        }))
        .slice(0, 8)}
    />
  );
}
