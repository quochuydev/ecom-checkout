import { db } from "@/db";
import { product, image, imageToProduct, productCategory, productToProductCategory } from "@/db/schema";
import Home from "@/ui/home";
import { desc, eq, inArray } from "drizzle-orm";

export default async function Page() {
  const [products, categories] = await Promise.all([
    getProductsWithImages(8),
    getCategoriesWithImages(),
  ]).catch(() => [[], []]);

  return <Home products={products} productCategories={categories} />;
}

async function getProductsWithImages(limit?: number) {
  const allProducts = await db
    .select()
    .from(product)
    .orderBy(desc(product.createdDate))
    .limit(limit ?? 100);

  if (allProducts.length === 0) return [];

  const productIds = allProducts.map((p) => p.id);
  const imgLinks = await db.select().from(imageToProduct).where(inArray(imageToProduct.b, productIds));
  const imgIds = imgLinks.map((l) => l.a);
  const images = imgIds.length > 0 ? await db.select().from(image).where(inArray(image.id, imgIds)) : [];

  const catLinks = await db.select().from(productToProductCategory).where(inArray(productToProductCategory.a, productIds));
  const catIds = [...new Set(catLinks.map((l) => l.b))];
  const cats = catIds.length > 0 ? await db.select().from(productCategory).where(inArray(productCategory.id, catIds)) : [];

  return allProducts.map((p) => ({
    ...p,
    images: imgLinks.filter((l) => l.b === p.id).map((l) => images.find((i) => i.id === l.a)!).filter(Boolean),
    productCategories: catLinks.filter((l) => l.a === p.id).map((l) => cats.find((c) => c.id === l.b)!).filter(Boolean),
  }));
}

async function getCategoriesWithImages() {
  const cats = await db.select().from(productCategory).orderBy(desc(productCategory.createdDate));
  const imgIds = cats.map((c) => c.imageId).filter((id): id is string => id !== null);
  const images = imgIds.length > 0 ? await db.select().from(image).where(inArray(image.id, imgIds)) : [];
  return cats.map((c) => ({ ...c, image: images.find((i) => i.id === c.imageId) ?? null }));
}
