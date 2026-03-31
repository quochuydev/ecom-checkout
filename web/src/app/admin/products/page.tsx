import React from "react";
import Products from "@/ui/admin/products";
import { db } from "@/db";
import { product, image, imageToProduct } from "@/db/schema";
import { inArray, isNull } from "drizzle-orm";

export default async function Page() {
  const products = await db.select().from(product).where(isNull(product.deletedAt));

  const productIds = products.map((p) => p.id);
  const imgLinks = productIds.length > 0
    ? await db.select().from(imageToProduct).where(inArray(imageToProduct.b, productIds))
    : [];
  const imgIds = imgLinks.map((l) => l.a);
  const images = imgIds.length > 0
    ? await db.select().from(image).where(inArray(image.id, imgIds))
    : [];

  const productsWithImages = products.map((p) => ({
    ...p,
    images: imgLinks.filter((l) => l.b === p.id).map((l) => images.find((i) => i.id === l.a)!).filter(Boolean),
  }));

  return <Products products={productsWithImages} />;
}
