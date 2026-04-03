import type { MetadataRoute } from "next";
import { isNull } from "drizzle-orm";
import { db } from "@/db";
import { product, blog, productCategory } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || "http://localhost:3333";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const [products, blogs, categories] = await Promise.all([
    db
      .select({ slug: product.slug, updatedDate: product.updatedDate })
      .from(product)
      .where(isNull(product.deletedAt)),
    db
      .select({ id: blog.id, updatedDate: blog.updatedDate })
      .from(blog),
    db
      .select({
        slug: productCategory.slug,
        updatedDate: productCategory.updatedDate,
      })
      .from(productCategory),
  ]);

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${b.id}`,
    lastModified: b.updatedDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: c.updatedDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages, ...categoryPages];
}
