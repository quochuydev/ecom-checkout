import type { Product } from "@/lib/types";

const WEB_API_URL = process.env.WEB_API_URL ?? "http://localhost:3333";

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${WEB_API_URL}/api/v1/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`web /api/v1/products responded ${res.status}`);
  }
  const data = (await res.json()) as { items?: Product[] };
  return data.items ?? [];
}

export function searchProducts(products: Product[], query: string): Product[] {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length > 1);

  if (tokens.length === 0) return products.slice(0, 8);

  const scored = products.map((p) => {
    const haystack = `${p.title ?? ""} ${p.description ?? ""}`.toLowerCase();
    const score = tokens.reduce((acc, t) => (haystack.includes(t) ? acc + 1 : acc), 0);
    return { p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.p);
}
