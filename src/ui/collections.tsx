'use client';
import React from 'react';
import Collections from '@/components/Collections';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Page({ products, productCategories }: any) {
  return (
    <>
      <Header />
      <Collections
        productCategories={productCategories}
        products={products.map((e: any) => ({
          id: e.id,
          name: e.name,
          price: e.price,
          href: `/products/${e.slug}`,
          imageSrc: e.images?.[0]?.src,
          imageAlt: e.images?.[0]?.alt,
        }))}
      />
      <Footer />
    </>
  );
}
