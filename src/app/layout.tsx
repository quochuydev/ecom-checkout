import Providers from "@/components/ReactQueryProviders";
import { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: "E-commerce",
    template: "%s | Next.js App Router",
  },
  description:
    "A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.",
  openGraph: {
    title: "Next.js App Router Playground",
    description:
      "A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.",
    images: [`/api/og?title=Next.js App Router`],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
