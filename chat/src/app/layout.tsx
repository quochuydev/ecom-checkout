import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Shopping Assistant",
  description: "Chat with our AI to find products you'll love.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full bg-white text-[#050505] antialiased">{children}</body>
    </html>
  );
}
