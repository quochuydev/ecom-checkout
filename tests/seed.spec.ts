import { expect, test } from "vitest";
import { prisma } from "@/lib/prisma";
import fixture from "./fixture/seed";

test("seed", async () => {
  for (const productCategoryData of fixture.productCategories) {
    const productCategory = await prisma.productCategory.create({
      data: productCategoryData,
    });

    console.log(`debug:productCategory`, productCategory);
  }

  for (const productData of fixture.products) {
    const product = await prisma.product.create({
      data: productData,
    });

    console.log(`debug:product`, product);
  }

  expect(true).toBeTruthy();
});
