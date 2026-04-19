import React from "react";
import Categories from "@/ui/categories";
import { loadCategoriesIndex } from "@/lib/loaders";

export default async function Page() {
  const { products, productCategories } = await loadCategoriesIndex().catch(() => ({
    products: [],
    productCategories: [],
  }));
  return <Categories products={products as any} productCategories={productCategories} />;
}
