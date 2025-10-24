import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IntelliM 数字员工驱动的内容营销操作系统",
  description:
    "IntelliM 通过策划、洞察、协作、任务、创意与运营六大模块，帮助 KA 品牌构建人机共创的内容营销闭环。",
  keywords: ["IntelliM", "内容营销", "数字员工", "AI Native", "SaaS"],
  openGraph: {
    title: "IntelliM 数字员工驱动的内容营销操作系统",
    description:
      "聚焦 KA 品牌线下销售需求，串联策划洞察到复盘沉淀的全链路营销平台。",
    type: "website",
    locale: "zh_CN",
  },
  alternates: {
    canonical: "https://www.example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
