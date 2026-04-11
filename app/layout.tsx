import type { Metadata } from "next";
import "./globals.css";
import { HOME_DESCRIPTION, PRODUCT_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} | 特价机票发现平台`,
  description: HOME_DESCRIPTION
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
