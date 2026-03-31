import React, { use } from "react";
import Product from "@/ui/admin/product";
import configuration from "@/configuration";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = use(params);
  return <Product productId={productId} apiUrl={configuration.apiUrl} />;
}
