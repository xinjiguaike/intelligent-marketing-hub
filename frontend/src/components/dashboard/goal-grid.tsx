import { GoalProgress } from "@/types";
import { GlassPanel } from "@/components/ui/glass-panel";
import { CircularProgress } from "@/components/ui/progress";
import { CalendarClock, Clock3, User } from "lucide-react";
import dayjs from "dayjs";

type GoalGridProps = {
  goals: GoalProgress[];
};

export function GoalGrid({ goals }: GoalGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {goals.map((goal) => (
        <GlassPanel key={goal.id} className="relative overflow-hidden">
          <div className="absolute right-4 top-4">
            <CircularProgress value={goal.progress * 100} />
          </div>
          <div className="space-y-3 pr-24">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CalendarClock className="h-4 w-4 text-sky-300" />
              <span>关键交付</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{goal.name}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <Clock3 className="h-3.5 w-3.5 text-sky-300" />
              <span>截止：{dayjs(goal.deadline).format("YYYY-MM-DD HH:mm")}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <User className="h-3.5 w-3.5 text-sky-300" />
              <span>负责人：{goal.owner}</span>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
