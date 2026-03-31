import { test, expect } from "@playwright/test";

test.describe.serial("Full checkout flow", () => {
  let orderId: string;

  test("browse homepage, add product to cart, and complete checkout", async ({
    page,
  }) => {
    // 1. Go to homepage
    await page.goto("/");

    // 2. Wait for products to load and click the first product link
    const productCard = page.locator('a[href^="/products/"]:not([href*="e2e-product"])').first();
    await expect(productCard).toBeVisible({ timeout: 15_000 });
    await productCard.click();
    await page.waitForURL(/\/products\//, { timeout: 15_000 });

    // 3. Product detail page — wait for add-to-cart button
    const addToCartBtn = page.getByRole("button", {
      name: /thêm vào giỏ hàng/i,
    });
    await expect(addToCartBtn).toBeVisible({ timeout: 10_000 });

    // Give time for cart cookie to be set by GET /api/v1/cart
    await page.waitForTimeout(3_000);

    // 4. Click add to cart
    await addToCartBtn.click();

    // 5. Verify cart badge shows item count
    const cartBadge = page.locator("button:has(svg) span.rounded-full");
    await expect(cartBadge).toBeVisible({ timeout: 10_000 });

    // 6. Navigate to checkout page
    await page.goto("/checkout");
    await expect(
      page.getByRole("heading", { name: "Thanh Toán", exact: true }),
    ).toBeVisible({ timeout: 10_000 });

    // Wait for cart data to load
    await page.waitForTimeout(3_000);

    // 7. Fill in checkout form
    await page.fill("#email", "test@example.com");
    await page.fill("#firstName", "Nguyen Van Test");
    await page.fill("#phone", "0901234567");
    await page.fill("#address", "123 Test Street");
    await page.fill("#city", "Ho Chi Minh");
    await page.fill("#province", "District 1");

    // 8. Submit the order
    const submitBtn = page.getByRole("button", { name: /đặt hàng/i });
    await submitBtn.scrollIntoViewIfNeeded();
    await expect(submitBtn).toBeVisible();

    const [checkoutResponse] = await Promise.all([
      page.waitForResponse((resp) => resp.url().includes("/cart/checkout"), {
        timeout: 20_000,
      }),
      submitBtn.click(),
    ]);
    const checkoutData = await checkoutResponse.json();

    // 9. Verify order success
    await expect(page.getByText(/cảm ơn bạn đã đặt hàng/i)).toBeVisible({
      timeout: 10_000,
    });

    orderId = checkoutData.orderId;
    expect(orderId).toBeTruthy();
    console.log(`Order created: ${orderId}`);
  });

  test("admin login and update order status", async ({ page, request }) => {
    expect(orderId).toBeTruthy();

    // 1. Login via browser
    await page.goto("/admin/login");
    await page.fill("#email", "cappuai@yopmail.com");
    await page.fill("#password", "Qwerty@123");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for redirect to admin orders
    await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible({
      timeout: 15_000,
    });

    // 2. Wait for orders data to load and search for the order
    await page.waitForTimeout(3_000);
    const searchInput = page.getByPlaceholder("Search orders...");
    await searchInput.fill(orderId.substring(0, 8));
    await page.waitForTimeout(1_000);

    // 3. Verify the order appears in the filtered table
    const orderCell = page.getByText(orderId.substring(0, 8));
    await expect(orderCell).toBeVisible({ timeout: 10_000 });
    console.log(`Order ${orderId} found in admin orders list`);

    // 4. Update order status to Shipped via API (using browser session cookies)
    const shippedResult = await page.evaluate(async (id) => {
      const res = await fetch(`/api/v1/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Shipped" }),
      });
      return { status: res.status, body: await res.json() };
    }, orderId);
    expect(shippedResult.status).toBe(200);
    console.log(`Order ${orderId} status updated to Shipped via API`);

    // 5. Reload and verify Shipped in UI
    await page.reload();
    await page.waitForTimeout(3_000);
    await page.getByPlaceholder("Search orders...").fill(orderId.substring(0, 8));
    await page.waitForTimeout(1_000);

    const shippedRow = page.locator("tr", {
      has: page.getByText(orderId.substring(0, 8)),
    });
    await expect(shippedRow.getByText("Shipped")).toBeVisible({
      timeout: 10_000,
    });

    // 6. Update order status to Delivered via API
    const deliveredResult = await page.evaluate(async (id) => {
      const res = await fetch(`/api/v1/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Delivered" }),
      });
      return { status: res.status, body: await res.json() };
    }, orderId);
    expect(deliveredResult.status).toBe(200);
    console.log(`Order ${orderId} status updated to Delivered via API`);

    // 7. Reload and verify Delivered in UI
    await page.reload();
    await page.waitForTimeout(3_000);
    await page.getByPlaceholder("Search orders...").fill(orderId.substring(0, 8));
    await page.waitForTimeout(1_000);

    const deliveredRow = page.locator("tr", {
      has: page.getByText(orderId.substring(0, 8)),
    });
    await expect(deliveredRow.getByText("Delivered")).toBeVisible({
      timeout: 10_000,
    });
    console.log(`Order ${orderId} status verified as Delivered in UI`);

    console.log("Admin order status update flow completed");
  });
});
