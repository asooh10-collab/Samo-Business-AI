import "./globals.css";
import type { Metadata } from "next";
import AutoBackup from "./components/AutoBackup";

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
      <body>
        <AutoBackup />
        {children}
      </body>
    </html>
  );
}
