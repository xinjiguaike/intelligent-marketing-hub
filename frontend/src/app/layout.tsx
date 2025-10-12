import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 智能营销指挥舱",
  description:
    "AI Native 的智能内容营销 SaaS 前端体验，聚焦多角色协同与数字员工互动。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent`}
      >
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_65%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),transparent_60%)]" />
          <div className="relative">
            <AppShell>{children}</AppShell>
          </div>
        </div>
      </body>
    </html>
  );
}
