import React from "react";
import ProductUI from "@/ui/product";
import { db } from "@/db";
import { product, image, imageToProduct } from "@/db/schema";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({ params }: any) {
  const { slug } = await params;

  const [found] = await db
    .select()
    .from(product)
    .where(and(eq(product.slug, slug), isNull(product.deletedAt)));

  if (!found) redirect("/");

  const imgLinks = await db.select().from(imageToProduct).where(eq(imageToProduct.b, found.id));
  const imgIds = imgLinks.map((l) => l.a);
  const images = imgIds.length > 0
    ? await db.select().from(image).where(inArray(image.id, imgIds))
    : [];

  const productWithImages = { ...found, images };

  const allProducts = await db.select().from(product).where(isNull(product.deletedAt));
  const allImgLinks = allProducts.length > 0
    ? await db.select().from(imageToProduct).where(inArray(imageToProduct.b, allProducts.map((p) => p.id)))
    : [];
  const allImgIds = allImgLinks.map((l) => l.a);
  const allImages = allImgIds.length > 0
    ? await db.select().from(image).where(inArray(image.id, allImgIds))
    : [];

  const relatedProducts = allProducts
    .filter((p) => p.id !== found.id)
    .slice(0, 8)
    .map((p) => ({
      ...p,
      images: allImgLinks.filter((l) => l.b === p.id).map((l) => allImages.find((i) => i.id === l.a)!).filter(Boolean),
    }));

  return (
    <ProductUI
      product={productWithImages as any}
      relatedProducts={relatedProducts.slice(0, 8)}
    />
  );
}
