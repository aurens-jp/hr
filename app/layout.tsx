import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurens HR Platform",
  description: "人事労務・勤怠・給与・電子申請を統合するクラウドHRプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
