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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(140%_140%_at_10%_10%,rgba(148,197,255,0.28),transparent),linear-gradient(180deg,#f8faff_0%,#e2e8f0_100%)] text-slate-900`}
      >
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_0%,rgba(126,196,252,0.35),transparent),radial-gradient(45%_55%_at_80%_15%,rgba(183,233,255,0.35),transparent_70%)]" />
          <div className="relative">
            <AppShell>{children}</AppShell>
          </div>
        </div>
      </body>
    </html>
  );
}
