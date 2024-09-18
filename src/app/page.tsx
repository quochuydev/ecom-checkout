import { prisma } from "@/lib/prisma";
import { Product } from "@/types/api";
import Home from "@/ui/home";

export default async function Page() {
  const [products, productCategories] = await Promise.all([
    prisma.product.findMany({
      include: {
        images: true,
        productCategories: true,
      },
      take: 8,
      orderBy: {
        createdDate: "desc",
      },
    }),
    prisma.productCategory.findMany({
      include: {
        image: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    }),
  ]).catch(() => [[], []]);

  return (
    <Home
      products={products as Product[]}
      productCategories={productCategories}
    />
  );
}
