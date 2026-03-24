import { config } from "@/lib/config";

export async function sendOrderNotification(order: {
  orderId: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  itemCount: number;
}) {
  if (!config.smtp.user || !config.smtp.pass) {
    return;
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });

    await transporter.sendMail({
      from: config.smtp.from,
      to: config.auth.adminEmail,
      subject: `New Order #${order.orderId.substring(0, 8)}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Customer:</strong> ${order.customerName} (${order.customerEmail})</p>
        <p><strong>Items:</strong> ${order.itemCount}</p>
        <p><strong>Total:</strong> ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(order.amount)}</p>
        <p><a href="${config.app.url}/admin/orders">View in Admin</a></p>
      `,
    });
    console.log(`[email] Order notification sent for #${order.orderId.substring(0, 8)}`);
  } catch (error) {
    console.error("[email] Failed to send order notification:", error);
  }
}
