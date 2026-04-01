import { test, expect } from "@playwright/test";

test("admin login and delete all e2e products", async ({ page }) => {
  // 1. Login as admin
  await page.goto("/admin/login");
  await page.fill("#email", "cappuai@yopmail.com");
  await page.fill("#password", "Qwerty@123");
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible({
    timeout: 15_000,
  });

  // 2. Fetch all products and filter e2e ones
  const e2eProducts = await page.evaluate(async () => {
    const res = await fetch("/api/v1/admin/products");
    const data = await res.json();
    return data.items.filter((p: { title: string; id: string }) =>
      p.title.startsWith("E2E Product"),
    );
  });

  console.log(`Found ${e2eProducts.length} e2e products to delete`);

  // 3. Delete each e2e product
  for (const p of e2eProducts) {
    const result = await page.evaluate(async (productId: string) => {
      const res = await fetch(`/api/v1/admin/products/${productId}`, {
        method: "DELETE",
      });
      return { status: res.status };
    }, p.id);

    expect(result.status).toBe(200);
    console.log(`Deleted e2e product: ${p.id} - ${p.title}`);
  }

  expect(e2eProducts.length).toBeGreaterThan(0);
});
