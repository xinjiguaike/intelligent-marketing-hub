import { personalBoards } from "@/data/mock/orchestration";
import { PersonalBoard } from "@/components/workflow/personal-board";
import type { PersonalBoard as PersonalBoardType } from "@/types";

type HomePageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: HomePageProps) {
  if (!personalBoards.length) {
    return (
      <div className="pb-12">
        <h1 className="text-2xl font-semibold text-white">个人工作台</h1>
        <p className="mt-2 text-sm text-slate-400">暂无可展示的个人工作台数据。</p>
      </div>
    );
  }

  const userParam = searchParams?.user;
  const activeId = Array.isArray(userParam) ? userParam[0] : userParam;
  const boardData = personalBoards.find((board) => board.id === activeId) ?? personalBoards[0];
  const { id: boardId, ...rest } = boardData;
  const board = rest as PersonalBoardType;

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-white">{board.owner} 的个人工作台</h1>
        <p className="text-sm text-slate-400">
          当前角色：{board.role} ｜ 协同 AI：{board.aiPartner} ｜ 看板 ID：{boardId}
        </p>
      </div>
      <PersonalBoard board={board} />
    </div>
  );
}
