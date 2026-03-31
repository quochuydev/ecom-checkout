/**
 * Seed admin account via better-auth sign-up API.
 * Run: npx tsx scripts/seed-admin.ts
 * Requires the Next.js dev server to be running on port 3333.
 */

const appUrl = "https://shop.cappuai.com";
const adminEmail = "cappuai@yopmail.com";
const adminPassword = "Qwerty@123";
const adminName = "Admin";

async function main() {
  console.log(`Seeding admin account: ${adminEmail}`);

  // 1. Sign up the admin user
  const signUpRes = await fetch(`${appUrl}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: appUrl },
    body: JSON.stringify({
      email: adminEmail,
      password: adminPassword,
      name: adminName,
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
  const loginRes = await fetch(`${appUrl}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: appUrl },
    body: JSON.stringify({
      email: adminEmail,
      password: adminPassword,
    }),
  });

  if (loginRes.ok) {
    console.log("Admin login verified successfully");
  } else {
    console.log("Login failed:", loginRes.status, await loginRes.text());
  }
}

main().catch(console.error);
