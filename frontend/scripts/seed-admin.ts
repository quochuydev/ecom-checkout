/**
 * Seed admin account via better-auth sign-up API.
 * Run: npx tsx scripts/seed-admin.ts
 * Requires the Next.js dev server to be running on port 3333.
 */

const APP_URL = process.env.APP_URL || "http://localhost:3333";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "cappuai@yopmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Qwerty@123";
const ADMIN_NAME = "Admin";

async function main() {
  console.log(`Seeding admin account: ${ADMIN_EMAIL}`);

  // 1. Sign up the admin user
  const signUpRes = await fetch(`${APP_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": APP_URL },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    }),
  });

  if (signUpRes.ok) {
    console.log("Admin account created successfully");
  } else {
    const err = await signUpRes.text();
    if (err.includes("already exists") || err.includes("already")) {
      console.log("Admin account already exists, skipping");
    } else {
      console.log("Sign-up response:", signUpRes.status, err);
    }
  }

  // 2. Verify login works
  const loginRes = await fetch(`${APP_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": APP_URL },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });

  if (loginRes.ok) {
    console.log("Admin login verified successfully");
  } else {
    console.log("Login failed:", loginRes.status, await loginRes.text());
  }
}

main().catch(console.error);
