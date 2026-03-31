import Providers from "@/components/ReactQueryProviders";
import { setting } from "@/settings";
import { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: `${setting.title} - ${setting.description}`,
    template: `%s | ${setting.title}`,
  },
  description: `${setting.title} - ${setting.description}`,
  openGraph: {
    title: `${setting.title} - ${setting.description}`,
    description: `${setting.title} - ${setting.description}`,
    images: ["/images/ECOM-2.1-1.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/images/cropped-cropped-364080966_297037076171649_5977668929998035559_n-1.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
