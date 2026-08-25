import "./globals.css";impor
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAMO Business AI",
  description: "لوحة ذكية لإدارة المبيعات والمخزون والأرباح",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
