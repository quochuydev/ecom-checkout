import { db } from "@/db";
import {
  blog,
  image,
  imageToProduct,
  product,
  productCategory,
  productToProductCategory,
} from "@/db/schema";
import { and, desc, eq, inArray, isNull } from "drizzle-orm";

async function attachProductRelations(products: any[]) {
  if (products.length === 0) return [];
  const productIds = products.map((p) => p.id);

  const [imgLinks, catLinks] = await Promise.all([
    db.select().from(imageToProduct).where(inArray(imageToProduct.b, productIds)),
    db.select().from(productToProductCategory).where(inArray(productToProductCategory.a, productIds)),
  ]);

  const imgIds = imgLinks.map((l) => l.a);
  const catIds = [...new Set(catLinks.map((l) => l.b))];

  const [images, cats] = await Promise.all([
    imgIds.length > 0 ? db.select().from(image).where(inArray(image.id, imgIds)) : [],
    catIds.length > 0 ? db.select().from(productCategory).where(inArray(productCategory.id, catIds)) : [],
  ]);

  const imageMap = new Map(images.map((i) => [i.id, i]));
  const catMap = new Map(cats.map((c) => [c.id, c]));

  return products.map((p) => ({
    ...p,
    images: imgLinks.filter((l) => l.b === p.id).map((l) => imageMap.get(l.a)).filter(Boolean),
    productCategories: catLinks.filter((l) => l.a === p.id).map((l) => catMap.get(l.b)).filter(Boolean),
  }));
}

export async function loadCategoriesWithImages() {
  const cats = await db.select().from(productCategory).orderBy(desc(productCategory.createdDate));
  const imgIds = cats.map((c) => c.imageId).filter((id): id is string => id !== null);
  const images = imgIds.length > 0 ? await db.select().from(image).where(inArray(image.id, imgIds)) : [];
  const imageMap = new Map(images.map((i) => [i.id, i]));
  return cats.map((c) => ({ ...c, image: imageMap.get(c.imageId!) ?? null }));
}

export async function loadHome() {
  const products = await db
    .select()
    .from(product)
    .where(isNull(product.deletedAt))
    .orderBy(desc(product.createdDate))
    .limit(8);
  const [withRelations, categories] = await Promise.all([
    attachProductRelations(products),
    loadCategoriesWithImages(),
  ]);
  return { products: withRelations, productCategories: categories };
}

export async function loadCategoriesIndex() {
  const products = await db.select().from(product).where(isNull(product.deletedAt));
  const [withRelations, categories] = await Promise.all([
    attachProductRelations(products),
    loadCategoriesWithImages(),
  ]);
  return { products: withRelations, productCategories: categories };
}

export async function loadCategory(slug: string) {
  const [cat] = await db.select().from(productCategory).where(eq(productCategory.slug, slug));
  const categories = await loadCategoriesWithImages();

  if (!cat) return { category: null, products: [], productCategories: categories };

  const catLinks = await db
    .select()
    .from(productToProductCategory)
    .where(eq(productToProductCategory.b, cat.id));
  const productIds = catLinks.map((l) => l.a);
  if (productIds.length === 0) {
    return { category: cat, products: [], productCategories: categories };
  }

  const products = await db
    .select()
    .from(product)
    .where(and(inArray(product.id, productIds), isNull(product.deletedAt)));
  const withRelations = await attachProductRelations(products);

  return { category: cat, products: withRelations, productCategories: categories };
}

export async function loadProduct(slug: string) {
  const [found] = await db
    .select()
    .from(product)
    .where(and(eq(product.slug, slug), isNull(product.deletedAt)));
  if (!found) return null;

  const imgLinks = await db.select().from(imageToProduct).where(eq(imageToProduct.b, found.id));
  const imgIds = imgLinks.map((l) => l.a);
  const images = imgIds.length > 0
    ? await db.select().from(image).where(inArray(image.id, imgIds))
    : [];

  const others = await db
    .select()
    .from(product)
    .where(isNull(product.deletedAt));
  const relatedRaw = others.filter((p) => p.id !== found.id).slice(0, 8);
  const related = await attachProductRelations(relatedRaw);

  return {
    product: { ...found, images },
    relatedProducts: related.slice(0, 8),
  };
}

export async function loadBlogs() {
  const blogs = await db.select().from(blog);
  return { blogs };
}

export async function loadBlog(_slug: string) {
  const [found] = await db.select().from(blog).limit(1);
  return { blog: found ?? null };
}

export async function loadPage(slug: string) {
  return { slug };
}
