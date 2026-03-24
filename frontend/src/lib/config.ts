export const config = {
  app: {
    url: process.env.APP_URL || "http://localhost:3333",
    name: "Optica",
  },
  auth: {
    secret: process.env.BETTER_AUTH_SECRET || "secret",
    adminEmail: process.env.ADMIN_EMAIL || "cappuai@yopmail.com",
  },
  db: {
    url: process.env.DATABASE_URL || "",
  },
  redis: {
    url: process.env.REDIS_URL || "",
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || "noreply@optica-demo.com",
  },
  orderStatuses: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"] as const,
};

export type OrderStatus = (typeof config.orderStatuses)[number];
