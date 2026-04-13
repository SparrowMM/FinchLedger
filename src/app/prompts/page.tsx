"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AI_PROMPT_KEY_BOOKKEEPING } from "@/lib/ai-prompts-defaults";
import { BOOKKEEPING_IMPORT_CHANNELS } from "@/lib/import-channels";

type AiPromptRow = {
  key: string;
  label: string;
  hint: string;
  content: string;
  defaultContent: string;
  fromDatabase: boolean;
  updatedAt: string | null;
};

type PreviewKind = "effective" | "draft";

type PromptVersionSummary = {
  id: string;
  createdAt: string;
  charCount: number;
  snippet: string;
};

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<AiPromptRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [activeKey, setActiveKey] = useState<string>("");
  const [panelMode, setPanelMode] = useState<"preview" | "edit">("preview");
  const [previewKind, setPreviewKind] = useState<PreviewKind>("effective");
  const [previewText, setPreviewText] = useState<string>("");
  const [previewMeta, setPreviewMeta] = useState<{
    mode: string;
    charCount: number;
  } | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewImportChannel, setPreviewImportChannel] =
    useState<string>("alipay");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [versionSummaries, setVersionSummaries] = useState<PromptVersionSummary[]>(
    []
  );
  const [versionsLoading, setVersionsLoading] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState<string>("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/ai-prompts");
      const json = (await res.json().catch(() => null)) as
        | { prompts?: AiPromptRow[]; error?: string }
        | null;
      if (!res.ok) {
        throw new Error(json?.error || "加载失败");
      }
      const list = json?.prompts ?? [];
      setPrompts(list);
      const next: Record<string, string> = {};
      for (const p of list) {
        next[p.key] = p.content;
      }
      setDrafts(next);
      setActiveKey((prev) => {
        if (!list.length) return "";
        if (prev && list.some((p) => p.key === prev)) return prev;
        return list[0].key;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "加载失败");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const loadVersions = useCallback(async () => {
    if (!activeKey) {
      setVersionSummaries([]);
      return;
    }
    setVersionsLoading(true);
    try {
      const res = await fetch(
        `/api/ai-prompts/versions?key=${encodeURIComponent(activeKey)}`
      );
      const json = (await res.json().catch(() => null)) as
        | { versions?: PromptVersionSummary[]; error?: string }
        | null;
      if (!res.ok) {
        throw new Error(json?.error || "加载历史失败");
      }
      setVersionSummaries(json?.versions ?? []);
    } catch {
      setVersionSummaries([]);
    } finally {
      setVersionsLoading(false);
    }
  }, [activeKey]);

  useEffect(() => {
    setSelectedVersionId("");
    void loadVersions();
  }, [loadVersions]);

  const active = useMemo(
    () => prompts.find((p) => p.key === activeKey) ?? null,
    [prompts, activeKey]
  );

  const dirty = useMemo(() => {
    if (!active) return false;
    return (drafts[active.key] ?? "") !== active.content;
  }, [active, drafts]);

  const fetchPreview = useCallback(async () => {
    if (!activeKey) return;
    setPreviewLoading(true);
    setPreviewError(null);
    try {
      const useDraft = previewKind === "draft";
      const res = await fetch("/api/ai-prompts/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: activeKey,
          ...(activeKey === AI_PROMPT_KEY_BOOKKEEPING
            ? { channel: previewImportChannel }
            : {}),
          ...(useDraft ? { template: drafts[activeKey] ?? "" } : {}),
        }),
      });
      const json = (await res.json().catch(() => null)) as
        | {
            error?: string;
            resolved?: string;
            mode?: string;
            charCount?: number;
          }
        | null;
      if (!res.ok) {
        throw new Error(json?.error || "预览失败");
      }
      setPreviewText(json?.resolved ?? "");
      setPreviewMeta({
        mode: json?.mode ?? "?",
        charCount: json?.charCount ?? (json?.resolved?.length ?? 0),
      });
    } catch (e) {
      setPreviewError(e instanceof Error ? e.message : "预览失败");
      setPreviewText("");
      setPreviewMeta(null);
    } finally {
      setPreviewLoading(false);
    }
  }, [activeKey, drafts, previewKind, previewImportChannel]);

  useEffect(() => {
    if (panelMode !== "preview" || !activeKey) return;
    void fetchPreview();
  }, [panelMode, activeKey, previewKind, previewImportChannel, fetchPreview]);

  async function saveKey(key: string) {
    const body = drafts[key] ?? "";
    setSavingKey(key);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/ai-prompts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, content: body }),
      });
      const json = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      if (!res.ok) {
        throw new Error(json?.error || "保存失败");
      }
      await load();
      await loadVersions();
      setSuccess("已保存到本地数据库。");
      if (panelMode === "preview") {
        void fetchPreview();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setSavingKey(null);
    }
  }

  async function revertKey(key: string) {
    setSavingKey(key);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/ai-prompts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, content: "" }),
      });
      const json = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      if (!res.ok) {
        throw new Error(json?.error || "恢复默认失败");
      }
      setPanelMode("preview");
      setPreviewKind("effective");
      await load();
      await loadVersions();
      setSuccess("已清除数据库中的自定义，恢复为内置默认。");
    } catch (e) {
      setError(e instanceof Error ? e.message : "恢复默认失败");
    } finally {
      setSavingKey(null);
    }
  }

  function resetDraftToLoaded() {
    if (!active) return;
    setDrafts((d) => ({ ...d, [active.key]: active.content }));
    setSuccess("编辑区已重置为当前已加载内容。");
  }

  async function loadSelectedVersionIntoDraft() {
    if (!active || !selectedVersionId) return;
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(
        `/api/ai-prompts/versions/${encodeURIComponent(selectedVersionId)}`
      );
      const json = (await res.json().catch(() => null)) as
        | { content?: string; error?: string }
        | null;
      if (!res.ok) {
        throw new Error(json?.error || "读取版本失败");
      }
      const text = typeof json?.content === "string" ? json.content : "";
      setDrafts((d) => ({ ...d, [active.key]: text }));
      setPanelMode("edit");
      setSuccess("已将所选历史版本载入编辑区，确认无误后可保存。");
    } catch (e) {
      setError(e instanceof Error ? e.message : "读取版本失败");
    }
  }

  async function restoreSelectedVersionToDatabase() {
    if (!active || !selectedVersionId) return;
    if (
      !window.confirm(
        "确定用该历史版本覆盖数据库中当前生效的提示词？此操作与在编辑区粘贴后保存等效。"
      )
    ) {
      return;
    }
    setSavingKey(active.key);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(
        `/api/ai-prompts/versions/${encodeURIComponent(selectedVersionId)}`,
        { method: "POST" }
      );
      const json = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      if (!res.ok) {
        throw new Error(json?.error || "恢复失败");
      }
      setPanelMode("preview");
      setPreviewKind("effective");
      await load();
      await loadVersions();
      setSuccess("已从历史版本恢复并写入数据库。");
      void fetchPreview();
    } catch (e) {
      setError(e instanceof Error ? e.message : "恢复失败");
    } finally {
      setSavingKey(null);
    }
  }

  const selectedVersionSnippet = useMemo(() => {
    if (!selectedVersionId) return "";
    return (
      versionSummaries.find((v) => v.id === selectedVersionId)?.snippet ?? ""
    );
  }, [selectedVersionId, versionSummaries]);

  if (loading && prompts.length === 0) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          AI 提示词
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">加载中…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          AI 提示词
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          预览将展示调用模型前实际使用的系统提示词（记账类会注入当前类目与支付方式）。编辑后保存写入本地数据库；危险数据清理仍在{" "}
          <Link
            href="/admin"
            className="text-zinc-800 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-zinc-600"
          >
            管理员
          </Link>
          。
        </p>
      </div>

      {error && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </div>
      )}
      {success && !error && (
        <div
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100"
          role="status"
        >
          {success}
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
        {prompts.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => {
              setActiveKey(p.key);
              setPreviewError(null);
            }}
            className={`rounded-full px-3 py-1 text-sm transition ${
              activeKey === p.key
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="ml-auto rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          {loading ? "刷新中…" : "重新加载配置"}
        </button>
      </div>

      {active && (
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                状态
              </p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100">
                {active.fromDatabase
                  ? active.updatedAt
                    ? `已自定义 · ${new Date(active.updatedAt).toLocaleString()}`
                    : "已自定义"
                  : "使用内置默认（未写入数据库）"}
                {dirty ? " · 编辑区有未保存修改" : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-700">
              {(
                [
                  ["preview", "预览"],
                  ["edit", "编辑"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPanelMode(id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    panelMode === id
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {active.hint}
          </p>

          <div className="space-y-2 rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                历史版本
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                每次成功保存后自动保留一条快照，每类最多50 条，可随时载入编辑区或直接写回数据库。
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedVersionId}
                onChange={(e) => setSelectedVersionId(e.target.value)}
                disabled={versionsLoading || versionSummaries.length === 0}
                className="min-w-[200px] max-w-full rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs outline-none focus:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-500"
                aria-label="选择历史版本"
              >
                <option value="">
                  {versionsLoading
                    ? "加载中…"
                    : versionSummaries.length === 0
                      ? "暂无历史（保存后生成）"
                      : "选择一条历史快照…"}
                </option>
                {versionSummaries.map((v) => (
                  <option key={v.id} value={v.id}>
                    {new Date(v.createdAt).toLocaleString()} · {v.charCount}{" "}
                    字符
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => void loadVersions()}
                disabled={versionsLoading}
                className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-[11px] text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                刷新列表
              </button>
              <button
                type="button"
                onClick={() => void loadSelectedVersionIntoDraft()}
                disabled={!selectedVersionId || Boolean(savingKey)}
                className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-[11px] text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                载入编辑区
              </button>
              <button
                type="button"
                onClick={() => void restoreSelectedVersionToDatabase()}
                disabled={!selectedVersionId || Boolean(savingKey)}
                className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] text-amber-900 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-950/70"
              >
                写回数据库（生效）
              </button>
            </div>
            {selectedVersionId && selectedVersionSnippet ? (
              <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                摘要：{selectedVersionSnippet}
                {selectedVersionSnippet.length >= 160 ? "…" : ""}
              </p>
            ) : null}
          </div>

          {panelMode === "preview" && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  预览范围
                </span>
                <div className="flex flex-wrap gap-1 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={() => setPreviewKind("effective")}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      previewKind === "effective"
                        ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    当前生效（已保存）
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewKind("draft")}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      previewKind === "draft"
                        ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    草稿（编辑框内容）
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => void fetchPreview()}
                  disabled={previewLoading}
                  className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-[11px] text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  {previewLoading ? "生成中…" : "刷新预览"}
                </button>
              </div>
              {active.key === AI_PROMPT_KEY_BOOKKEEPING && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    预览用导入类型（影响「本次 channel」与默认支付方式句）
                  </span>
                  <select
                    value={previewImportChannel}
                    onChange={(e) => setPreviewImportChannel(e.target.value)}
                    className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-500"
                  >
                    {BOOKKEEPING_IMPORT_CHANNELS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label} ({c.key})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {previewKind === "draft" && (
                <p className="text-[11px] text-amber-700 dark:text-amber-400/90">
                  草稿预览按当前编辑框文本替换占位符；若缺少占位符将报错。保存后「当前生效」预览才会持久更新。
                </p>
              )}
              {previewError && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {previewError}
                </p>
              )}
              <div className="relative max-h-[min(70vh,520px)] overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80">
                {previewLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 text-sm text-zinc-500 backdrop-blur-[1px] dark:bg-black/40">
                    正在生成预览…
                  </div>
                )}
                <pre className="whitespace-pre-wrap break-words p-4 font-mono text-[11px] leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {previewText || (previewLoading ? "" : "（无内容）")}
                </pre>
              </div>
              {previewMeta && !previewError && (
                <p className="text-[11px] text-zinc-400">
                  模式：{previewMeta.mode === "effective" ? "生效版本" : "草稿"} ·{" "}
                  {previewMeta.charCount} 字符
                </p>
              )}
            </div>
          )}

          {panelMode === "edit" && (
            <div className="space-y-2">
              <textarea
                value={drafts[active.key] ?? ""}
                onChange={(e) =>
                  setDrafts((d) => ({ ...d, [active.key]: e.target.value }))
                }
                rows={18}
                spellCheck={false}
                className="min-h-[280px] w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-[11px] leading-relaxed text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
                aria-label={`编辑 ${active.label}`}
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => resetDraftToLoaded()}
                  disabled={!dirty}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  撤销未保存修改
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDrafts((d) => ({
                      ...d,
                      [active.key]: active.defaultContent,
                    }));
                    setSuccess("已填入内置默认模板，保存后才会写入数据库。");
                  }}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  用内置默认覆盖编辑区
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => void saveKey(active.key)}
              disabled={Boolean(savingKey)}
              className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {savingKey === active.key ? "保存中…" : "保存到数据库"}
            </button>
            <button
              type="button"
              onClick={() => void revertKey(active.key)}
              disabled={Boolean(savingKey) || !active.fromDatabase}
              className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              清除自定义（恢复内置）
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
