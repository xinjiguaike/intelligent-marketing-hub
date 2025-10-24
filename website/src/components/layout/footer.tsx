import Link from "next/link";
import { footerLinks } from "@/data/mock/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <span className="inline-block text-xs uppercase tracking-[0.35em] text-blue-600">
            IntelliM
          </span>
          <p className="text-sm text-slate-600">
            内容营销数字员工平台，帮助 KA 品牌构建策划、创意、投放与复盘的持续增长引擎。
          </p>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} IntelliM. 保留所有权利。
          </p>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3 text-sm text-slate-600">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {group.title}
              </p>
              <ul className="space-y-2 text-sm">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-slate-600 transition hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
