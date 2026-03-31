# Ecom Checkout

A full-featured e-commerce application built with Next.js, featuring product management, shopping cart, checkout flow, and admin dashboard.

**Live:** https://shop.cappuai.com

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, Radix UI, shadcn/ui
- **Database:** PostgreSQL with Drizzle ORM
- **Auth:** better-auth (email/password)
- **Testing:** Vitest (unit), Playwright (e2e)

## Project Structure

```
ecom-checkout/
├── web/                  # Next.js application
│   ├── src/
│   │   ├── app/          # Pages and API routes
│   │   ├── components/   # Shared UI components
│   │   ├── db/           # Drizzle schema and config
│   │   ├── hooks/        # React hooks (useCart, useAuth, etc.)
│   │   ├── lib/          # Utilities (auth, api-caller, constants)
│   │   ├── types/        # TypeScript type definitions
│   │   └── ui/           # Page-level UI components
│   └── scripts/          # DB seed scripts
├── e2e/                  # Playwright e2e tests
├── playwright.config.ts  # Playwright config
└── seed.sql              # Database seed data
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL database

### Setup

```bash
# Install dependencies
cd web && pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your database URL and secrets

# Run database migrations
pnpm run db:migrate

# Seed admin account
pnpm run seed:admin

# Start dev server
pnpm dev
```

The app runs at http://localhost:3333.

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Auth secret (min 32 chars) |
| `APP_URL` | Application URL |
| `ADMIN_EMAIL` | Admin account email |
| `REDIS_URL` | Redis URL (optional) |

## E2E Tests

E2E tests use Playwright and run against the deployed app.

```bash
# Install Playwright browsers (first time)
npx playwright install chromium

# Run all e2e tests
npm run e2e

# Run with UI
npm run e2e:ui

# Run a specific test
npm run e2e -- e2e/checkout-flow.spec.ts
```

### Test Suites

- **checkout-flow** - Browse products, add to cart, checkout, admin order management
- **user-checkout-history** - User registration, checkout as logged-in user, order history
- **admin-create-product** - Admin product creation with image upload, storefront verification

## Admin Dashboard

Access at `/admin/login`. Features:

- Order management with status updates (Pending, Confirmed, Shipped, Delivered, Cancelled)
- Product CRUD with image upload
- Dashboard overview
