import { test, expect } from "@playwright/test";

const timestamp = Date.now();
const TEST_USER = {
  name: "Test User",
  email: `testuser+${timestamp}@example.com`,
  password: "Test@1234",
};

test.describe.serial("User sign up → checkout → order history", () => {
  let orderId: string;

  test("sign up a new account", async ({ page }) => {
    await page.goto("/register");

    await page.fill("#name", TEST_USER.name);
    await page.fill("#email", TEST_USER.email);
    await page.fill("#password", TEST_USER.password);

    await page.getByRole("button", { name: /đăng ký/i }).click();

    // Should redirect to account page after registration
    await expect(page).toHaveURL(/\/account/, { timeout: 15_000 });
    console.log(`User registered: ${TEST_USER.email}`);
  });

  test("add product to cart and checkout as logged-in user", async ({
    page,
  }) => {
    // 1. Login
    await page.goto("/login");
    await page.fill("#email", TEST_USER.email);
    await page.fill("#password", TEST_USER.password);
    await page.getByRole("button", { name: /đăng nhập/i }).click();
    await expect(page).toHaveURL(/\/account/, { timeout: 15_000 });

    // 2. Browse homepage and pick a product
    await page.goto("/");
    const productCard = page.locator('a[href^="/products/"]:not([href*="e2e-product"])').first();
    await expect(productCard).toBeVisible({ timeout: 15_000 });
    await productCard.click();
    await page.waitForURL(/\/products\//, { timeout: 15_000 });

    // 3. Add to cart
    const addToCartBtn = page.getByRole("button", {
      name: /thêm vào giỏ hàng/i,
    });
    await expect(addToCartBtn).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(3_000);
    await addToCartBtn.click();

    // 4. Verify cart badge
    const cartBadge = page.locator("button:has(svg) span.rounded-full");
    await expect(cartBadge).toBeVisible({ timeout: 10_000 });

    // 5. Go to checkout
    await page.goto("/checkout");
    await expect(
      page.getByRole("heading", { name: "Thanh Toán", exact: true }),
    ).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(3_000);

    // 6. Fill checkout form (email may be pre-filled for logged-in user)
    await page.fill("#email", TEST_USER.email);
    await page.fill("#firstName", TEST_USER.name);
    await page.fill("#phone", "0901234567");
    await page.fill("#address", "123 Test Street");
    await page.fill("#city", "Ho Chi Minh");
    await page.fill("#province", "District 1");

    // 7. Submit order
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

    // 8. Verify success
    await expect(page.getByText(/cảm ơn bạn đã đặt hàng/i)).toBeVisible({
      timeout: 10_000,
    });

    orderId = checkoutData.orderId;
    expect(orderId).toBeTruthy();
    console.log(`Order created: ${orderId}`);
  });

  test("view order in account order history", async ({ page }) => {
    expect(orderId).toBeTruthy();

    // 1. Login
    await page.goto("/login");
    await page.fill("#email", TEST_USER.email);
    await page.fill("#password", TEST_USER.password);
    await page.getByRole("button", { name: /đăng nhập/i }).click();
    await expect(page).toHaveURL(/\/account/, { timeout: 15_000 });

    // 2. Verify order history section is visible
    await expect(
      page.getByRole("heading", { name: /lịch sử đơn hàng/i }),
    ).toBeVisible({ timeout: 10_000 });

    // 3. Verify the order appears with its short ID
    const shortId = orderId.substring(0, 8);
    const orderEntry = page.getByText(`#${shortId}`);
    await expect(orderEntry).toBeVisible({ timeout: 10_000 });
    console.log(`Order #${shortId} found in account order history`);

    // 4. Expand the order to see details
    await orderEntry.click();
    await page.waitForTimeout(1_000);

    // 5. Verify order details are visible (line items should show product info)
    const orderDetails = page.locator("text=/SL:/i");
    await expect(orderDetails.first()).toBeVisible({ timeout: 5_000 });
    console.log(`Order #${shortId} details expanded successfully`);
  });
});
