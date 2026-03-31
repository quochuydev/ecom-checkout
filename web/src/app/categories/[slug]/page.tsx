import React from "react";
import Categories from "@/ui/categories";
import { db } from "@/db";
import { product, image, imageToProduct, productCategory, productToProductCategory } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export default async function Page({ params }: any) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProductsByCategorySlug(slug),
    getCategoriesWithImages(),
  ]).catch(() => [[], []]);

  return (
    <Categories
      products={products as any}
      productCategories={categories}
    />
  );
}

async function getProductsByCategorySlug(slug: string) {
  const [cat] = await db.select().from(productCategory).where(eq(productCategory.slug, slug));
  if (!cat) return [];

  const catLinks = await db.select().from(productToProductCategory).where(eq(productToProductCategory.b, cat.id));
  const productIds = catLinks.map((l) => l.a);
  if (productIds.length === 0) return [];

  const products = await db.select().from(product).where(inArray(product.id, productIds));
  const imgLinks = await db.select().from(imageToProduct).where(inArray(imageToProduct.b, productIds));
  const imgIds = imgLinks.map((l) => l.a);
  const images = imgIds.length > 0 ? await db.select().from(image).where(inArray(image.id, imgIds)) : [];

  const allCatLinks = await db.select().from(productToProductCategory).where(inArray(productToProductCategory.a, productIds));
  const allCatIds = [...new Set(allCatLinks.map((l) => l.b))];
  const allCats = allCatIds.length > 0 ? await db.select().from(productCategory).where(inArray(productCategory.id, allCatIds)) : [];

  return products.map((p) => ({
    ...p,
    images: imgLinks.filter((l) => l.b === p.id).map((l) => images.find((i) => i.id === l.a)!).filter(Boolean),
    productCategories: allCatLinks.filter((l) => l.a === p.id).map((l) => allCats.find((c) => c.id === l.b)!).filter(Boolean),
  }));
}

async function getCategoriesWithImages() {
  const cats = await db.select().from(productCategory);
  const imgIds = cats.map((c) => c.imageId).filter((id): id is string => id !== null);
  const images = imgIds.length > 0 ? await db.select().from(image).where(inArray(image.id, imgIds)) : [];
  return cats.map((c) => ({ ...c, image: images.find((i) => i.id === c.imageId) ?? null }));
}
