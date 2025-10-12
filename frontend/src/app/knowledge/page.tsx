"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  knowledgeCollections as initialCollections,
  knowledgeDrafts as initialDrafts,
  knowledgeTags as initialTags,
} from "@/data/mock/knowledge";
import {
  ArrowUpRight,
  BookOpenText,
  ClipboardList,
  FilePlus,
  Tag,
} from "lucide-react";
import type {
  KnowledgeArticle,
  KnowledgeDraft,
  KnowledgeTag,
} from "@/data/mock/knowledge";
import { cn } from "@/lib/utils";

export default function KnowledgePage() {
  const [collections, setCollections] =
    useState<typeof initialCollections>(initialCollections);
  const [drafts, setDrafts] = useState<KnowledgeDraft[]>(initialDrafts);
  const [tags, setTags] = useState<KnowledgeTag[]>(initialTags);

  const stats = useMemo(() => {
    const totalArticles = collections.reduce(
      (sum, collection) => sum + collection.items.length,
      0,
    );
    const pendingDrafts = drafts.filter(
      (draft) => draft.status !== "待发布",
    ).length;
    const lastUpdated = drafts[0]?.updatedAt ?? "-";
    return { totalArticles, pendingDrafts, lastUpdated };
  }, [collections, drafts]);

  return (
    <div className="space-y-8 pb-16">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">知识库</h1>
        <p className="text-sm text-slate-300">
          管理策略模板、执行手册与复盘洞察，支持审阅流程与标签体系，保障知识快速复用。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KnowledgeMetric
          title="知识条目"
          value={`${stats.totalArticles} 篇`}
          caption="沉淀跨团队可复用资产"
        />
        <KnowledgeMetric
          title="待审草稿"
          value={`${stats.pendingDrafts} 篇`}
          caption="需要负责人确认后发布"
          tone="warning"
        />
        <KnowledgeMetric
          title="标签总数"
          value={`${tags.length} 个`}
          caption="保持分类导航清晰"
        />
        <KnowledgeMetric
          title="最新更新"
          value={stats.lastUpdated}
          caption="最近变更时间"
        />
      </section>

      <AddArticleForm
        collections={collections}
        onAddArticle={(collectionId, article, tagList) => {
          setCollections((prev) =>
            prev.map((collection) =>
              collection.id === collectionId
                ? {
                    ...collection,
                    items: [
                      { ...article, id: `article-${Date.now()}` },
                      ...collection.items,
                    ],
                  }
                : collection,
            ),
          );
          setTags((prev) => updateTags(prev, tagList));
        }}
      />

      <section className="grid gap-6 lg:grid-cols-3">
        {collections.map((collection) => (
          <article
            key={collection.id}
            className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-100">
                <BookOpenText className="h-4 w-4" />
                {collection.title}
              </div>
              <p className="text-sm text-slate-300">{collection.description}</p>
            </div>
            <div className="mt-6 space-y-3">
              {collection.items.map((article) => (
                <div
                  key={article.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{article.title}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-400">
                      {article.category}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{article.summary}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>更新：{article.updatedAt}</span>
                    <span>{article.owner}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-sky-100">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-sky-100 transition hover:text-sky-200">
              查看全部文章
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">草稿审阅</h2>
              <p className="text-sm text-slate-400">
                跟踪待发布的知识条目，确保流程审核合规。
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25">
              <FilePlus className="h-3.5 w-3.5" />
              新建条目
            </button>
          </div>
          <AddDraftForm
            onAddDraft={(draft) =>
              setDrafts((prev) => [
                { ...draft, id: `draft-${Date.now()}` },
                ...prev,
              ])
            }
          />
          <div className="mt-5 space-y-3">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{draft.title}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-400">
                    {draft.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  提交人：{draft.owner} · 审核人：{draft.reviewer}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  关联模块：{draft.linkedModule}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>更新时间：{draft.updatedAt}</span>
                  <div className="flex gap-2">
                    <button className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[11px] text-sky-100 transition hover:bg-sky-400/20">
                      审阅
                    </button>
                    <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200 transition hover:border-sky-400/30 hover:text-sky-100">
                      指派
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">标签管理</h2>
              <p className="text-sm text-slate-400">
                调整标签体系，保持检索与复用的效率。
              </p>
            </div>
          </div>
          <AddTagForm
            onAddTag={(tag) =>
              setTags((prev) => [
                ...prev,
                {
                  id: `tag-${Date.now()}`,
                  name: tag,
                  usage: 0,
                  lastUsedAt: new Intl.DateTimeFormat("zh-CN", {
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date()),
                },
              ])
            }
          />
          <div className="mt-5 space-y-3">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
              >
                <div>
                  <p className="font-medium text-white">#{tag.name}</p>
                  <p className="text-xs text-slate-400">最近使用：{tag.lastUsedAt}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-400">
                  {tag.usage} 次引用
                </span>
              </div>
            ))}
          </div>
          <button className="mt-5 inline-flex items-center gap-2 text-xs text-sky-100 transition hover:text-sky-200">
            <ClipboardList className="h-3.5 w-3.5" />
            查看标签使用报告
          </button>
        </div>
      </section>
    </div>
  );
}

type MetricProps = {
  title: string;
  value: string;
  caption: string;
  tone?: "default" | "warning";
};

function KnowledgeMetric({ title, value, caption, tone = "default" }: MetricProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          {title}
        </p>
        <p
          className={`text-2xl font-semibold ${
            tone === "warning" ? "text-amber-200" : "text-white"
          }`}
        >
          {value}
        </p>
        <p className="text-xs text-slate-400">{caption}</p>
      </div>
    </div>
  );
}

type AddArticleFormProps = {
  collections: typeof initialCollections;
  onAddArticle: (
    collectionId: string,
    article: Omit<KnowledgeArticle, "id">,
    tags: string[],
  ) => void;
};

function AddArticleForm({ collections, onAddArticle }: AddArticleFormProps) {
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState({
    collectionId: collections[0]?.id ?? "",
    title: "",
    summary: "",
    category: "策略模板" as KnowledgeArticle["category"],
    owner: "",
    tags: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.collectionId || !form.title || !form.owner) return;
    const tagList = form.tags
      .split(/[,，]/)
      .map((item) => item.trim())
      .filter(Boolean);

    onAddArticle(
      form.collectionId,
      {
        title: form.title,
        summary: form.summary,
        category: form.category,
        updatedAt: new Intl.DateTimeFormat("zh-CN", {
          month: "2-digit",
          day: "2-digit",
        }).format(new Date()),
        owner: form.owner,
        tags: tagList,
      },
      tagList,
    );

    setForm({
      collectionId: form.collectionId,
      title: "",
      summary: "",
      category: form.category,
      owner: "",
      tags: "",
    });
    setOpen(false);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">新增知识条目</h2>
          <p className="text-sm text-slate-400">
            录入策略模板或执行手册，便于团队快速引用。
          </p>
        </div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
            isOpen
              ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
              : "border-white/10 bg-white/5 text-slate-200 hover:border-sky-400/30 hover:text-sky-100",
          )}
        >
          <FilePlus className="h-3.5 w-3.5" />
          {isOpen ? "收起表单" : "添加条目"}
        </button>
      </div>
      {isOpen ? (
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              归属目录
            </label>
            <select
              name="collectionId"
              value={form.collectionId}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            >
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.title}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              分类
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            >
              <option value="策略模板">策略模板</option>
              <option value="执行手册">执行手册</option>
              <option value="复盘洞察">复盘洞察</option>
              <option value="品牌资产">品牌资产</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              标题
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="例如：718 爆发期传播策略模板"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              摘要
            </label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows={2}
              placeholder="简要说明条目适用场景、核心要点等"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              负责人
            </label>
            <input
              name="owner"
              value={form.owner}
              onChange={handleChange}
              placeholder="条目维护人"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              标签（逗号分隔）
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="如：直播, 新品, KOC"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25"
            >
              保存知识条目
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}

type AddDraftFormProps = {
  onAddDraft: (draft: Omit<KnowledgeDraft, "id">) => void;
};

function AddDraftForm({ onAddDraft }: AddDraftFormProps) {
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    owner: "",
    reviewer: "",
    status: "待审核" as KnowledgeDraft["status"],
    linkedModule: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title || !form.owner || !form.reviewer) return;
    onAddDraft({
      ...form,
      updatedAt: new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
    });
    setForm({
      title: "",
      owner: "",
      reviewer: "",
      status: form.status,
      linkedModule: "",
    });
    setOpen(false);
  }

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-2xl">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
          isOpen
            ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
            : "border-white/10 bg-white/5 text-slate-200 hover:border-sky-400/30 hover:text-sky-100",
        )}
      >
        <FilePlus className="h-3.5 w-3.5" />
        {isOpen ? "收起表单" : "添加草稿"}
      </button>
      {isOpen ? (
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="知识条目标题"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            required
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              name="owner"
              value={form.owner}
              onChange={handleChange}
              placeholder="提交人"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
            <input
              name="reviewer"
              value={form.reviewer}
              onChange={handleChange}
              placeholder="审核人"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
          </div>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
          >
            <option value="待审核">待审核</option>
            <option value="修订中">修订中</option>
            <option value="待发布">待发布</option>
          </select>
          <input
            name="linkedModule"
            value={form.linkedModule}
            onChange={handleChange}
            placeholder="关联模块（可选）"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25"
          >
            保存草稿
          </button>
        </form>
      ) : null}
    </div>
  );
}

type AddTagFormProps = {
  onAddTag: (tag: string) => void;
};

function AddTagForm({ onAddTag }: AddTagFormProps) {
  const [tag, setTag] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = tag.trim();
    if (!trimmed) return;
    onAddTag(trimmed);
    setTag("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
      <input
        value={tag}
        onChange={(event) => setTag(event.target.value)}
        placeholder="新增标签名称"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100"
      >
        <Tag className="h-3.5 w-3.5" />
        添加标签
      </button>
    </form>
  );
}

function updateTags(existing: KnowledgeTag[], tagList: string[]) {
  const now = new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const map = new Map(existing.map((tag) => [tag.name, { ...tag }]));

  tagList.forEach((tagName) => {
    if (map.has(tagName)) {
      const current = map.get(tagName)!;
      current.usage += 1;
      current.lastUsedAt = now;
      map.set(tagName, current);
    } else {
      map.set(tagName, {
        id: `tag-${tagName}-${Date.now()}`,
        name: tagName,
        usage: 1,
        lastUsedAt: now,
      });
    }
  });

  return Array.from(map.values());
}
