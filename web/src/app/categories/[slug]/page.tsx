import React from "react";
import Categories from "@/ui/categories";
import { loadCategory } from "@/lib/loaders";

export default async function Page({ params }: any) {
  const { slug } = await params;
  const { products, productCategories } = await loadCategory(slug).catch(() => ({
    products: [],
    productCategories: [],
  }));
  return <Categories products={products as any} productCategories={productCategories} />;
}
