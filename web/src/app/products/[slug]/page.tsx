import React from "react";
import ProductUI from "@/ui/product";
import { loadProduct } from "@/lib/loaders";
import { redirect } from "next/navigation";

export default async function Page({ params }: any) {
  const { slug } = await params;
  const data = await loadProduct(slug);
  if (!data) redirect("/");
  return <ProductUI product={data.product as any} relatedProducts={data.relatedProducts} />;
}
