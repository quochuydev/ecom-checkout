import React, { use } from "react";
import Product from "@/ui/admin/product";
import { config } from "@/lib/config";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = use(params);
  return <Product productId={productId} apiUrl={config.api.url} />;
}
