import "./globals.css";
import type { Metadata } from "next";
import { Layout } from "@/base-components/layout/Layout";

export const metadata: Metadata = {
  title: "EntropyFlow",
  description:
    "Map your chronology. Visualize moments as nodes along time. See connections, not chaos.",
  icons: {
    icon: "/favicon2.png",
    shortcut: "/favicon2.png",
    apple: "/favicon2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
