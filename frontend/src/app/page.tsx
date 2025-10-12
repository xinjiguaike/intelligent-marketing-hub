import { Suspense } from "react";
import { personalBoards } from "@/data/mock/orchestration";
import { HomePageContent } from "@/components/home/home-page-content";

const fallback = (
  <div className="pb-12">
    <h1 className="text-2xl font-semibold text-white">个人工作台</h1>
    <p className="mt-2 text-sm text-slate-400">暂无可展示的个人工作台数据。</p>
  </div>
);

export default function HomePage() {
  return (
    <Suspense fallback={fallback}>
      <HomePageContent boards={personalBoards} />
    </Suspense>
  );
}
