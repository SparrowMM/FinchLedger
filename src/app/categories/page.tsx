"use client";

import { useEffect, useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

type CategoriesResponse = {
  categories: Category[];
  colorOptions: string[];
  iconOptions: string[];
  error?: string;
};

type IncomeCategoriesResponse = {
  categories: Category[];
  colorOptions: string[];
  iconOptions: string[];
  error?: string;
};

type PaymentMethod = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

type PaymentMethodsResponse = {
  methods: PaymentMethod[];
  colorOptions: string[];
  iconOptions: string[];
  error?: string;
};

type ImportChannelMappingRow = {
  channel: string;
  label: string;
  paymentMethodId: string | null;
  paymentMethodName: string | null;
};

const DEFAULT_NEW_CATEGORY = {
  name: "",
  color: "#3B82F6",
  icon: "📦",
};

const DEFAULT_NEW_PAYMENT_METHOD = {
  name: "",
  color: "#1677FF",
  icon: "💳",
};

const DEFAULT_NEW_INCOME_CATEGORY = {
  name: "",
  color: "#22C55E",
  icon: "💼",
};

type CategoryRule = {
  id: string;
  type: "expense" | "income";
  merchantName: string;
  category: string;
  source: string;
  updatedAt: string;
};

export default function CategoriesPage() {
  const [tab, setTab] = useState<
    "categories" | "incomeCategories" | "methods" | "rules"
  >("categories");

  const [categories, setCategories] = useState<Category[]>([]);
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [iconOptions, setIconOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState(DEFAULT_NEW_CATEGORY.name);
  const [color, setColor] = useState(DEFAULT_NEW_CATEGORY.color);
  const [icon, setIcon] = useState(DEFAULT_NEW_CATEGORY.icon);

  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [methodColorOptions, setMethodColorOptions] = useState<string[]>([]);
  const [methodIconOptions, setMethodIconOptions] = useState<string[]>([]);
  const [methodLoading, setMethodLoading] = useState(false);
  const [methodSaving, setMethodSaving] = useState(false);
  const [methodError, setMethodError] = useState<string | null>(null);
  const [editingMethodId, setEditingMethodId] = useState<string | null>(null);
  const [methodName, setMethodName] = useState(DEFAULT_NEW_PAYMENT_METHOD.name);
  const [methodColor, setMethodColor] = useState(DEFAULT_NEW_PAYMENT_METHOD.color);
  const [methodIcon, setMethodIcon] = useState(DEFAULT_NEW_PAYMENT_METHOD.icon);

  const [importMappings, setImportMappings] = useState<
    ImportChannelMappingRow[]
  >([]);
  const [importMapLoading, setImportMapLoading] = useState(false);
  const [importMapError, setImportMapError] = useState<string | null>(null);
  const [importMapSavingChannel, setImportMapSavingChannel] = useState<
    string | null
  >(null);

  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [incomeColorOptions, setIncomeColorOptions] = useState<string[]>([]);
  const [incomeIconOptions, setIncomeIconOptions] = useState<string[]>([]);
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [incomeSaving, setIncomeSaving] = useState(false);
  const [incomeError, setIncomeError] = useState<string | null>(null);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);
  const [incomeName, setIncomeName] = useState(DEFAULT_NEW_INCOME_CATEGORY.name);
  const [incomeColor, setIncomeColor] = useState(
    DEFAULT_NEW_INCOME_CATEGORY.color
  );
  const [incomeIcon, setIncomeIcon] = useState(DEFAULT_NEW_INCOME_CATEGORY.icon);

  const [rules, setRules] = useState<CategoryRule[]>([]);
  const [rulesLoading, setRulesLoading] = useState(false);
  const [rulesError, setRulesError] = useState<string | null>(null);
  const [learningFromHistory, setLearningFromHistory] = useState(false);
  const [rulesMessage, setRulesMessage] = useState<string | null>(null);
  const [deletingRuleId, setDeletingRuleId] = useState<string | null>(null);

  const editingItem = useMemo(
    () => categories.find((item) => item.id === editingId) ?? null,
    [categories, editingId]
  );
  const editingMethod = useMemo(
    () => methods.find((item) => item.id === editingMethodId) ?? null,
    [methods, editingMethodId]
  );
  const editingIncomeItem = useMemo(
    () => incomeCategories.find((item) => item.id === editingIncomeId) ?? null,
    [incomeCategories, editingIncomeId]
  );

  async function loadCategories() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/expense-categories");
      const data = (await res.json()) as CategoriesResponse;
      if (!res.ok) {
        throw new Error(data.error || "加载类目失败");
      }
      setCategories(data.categories ?? []);
      setColorOptions(data.colorOptions ?? []);
      setIconOptions(data.iconOptions ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "加载类目失败");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadMethods() {
    setMethodLoading(true);
    setMethodError(null);
    try {
      const res = await fetch("/api/payment-methods");
      const data = (await res.json()) as PaymentMethodsResponse;
      if (!res.ok) {
        throw new Error(data.error || "加载支付方式失败");
      }
      setMethods(data.methods ?? []);
      setMethodColorOptions(data.colorOptions ?? []);
      setMethodIconOptions(data.iconOptions ?? []);
    } catch (e) {
      setMethodError(e instanceof Error ? e.message : "加载支付方式失败");
    } finally {
      setMethodLoading(false);
    }
  }

  useEffect(() => {
    loadMethods();
  }, []);

  async function loadImportMappings() {
    setImportMapLoading(true);
    setImportMapError(null);
    try {
      const res = await fetch("/api/import-channel-payments");
      const data = (await res.json().catch(() => null)) as {
        mappings?: ImportChannelMappingRow[];
        error?: string;
      } | null;
      if (!res.ok) {
        throw new Error(data?.error || "加载导入类型映射失败");
      }
      setImportMappings(data?.mappings ?? []);
    } catch (e) {
      setImportMapError(
        e instanceof Error ? e.message : "加载导入类型映射失败"
      );
    } finally {
      setImportMapLoading(false);
    }
  }

  useEffect(() => {
    if (tab === "methods") {
      void loadImportMappings();
    }
  }, [tab]);

  async function loadIncomeCategories() {
    setIncomeLoading(true);
    setIncomeError(null);
    try {
      const res = await fetch("/api/income-categories");
      const data = (await res.json()) as IncomeCategoriesResponse;
      if (!res.ok) {
        throw new Error(data.error || "加载收入分类失败");
      }
      setIncomeCategories(data.categories ?? []);
      setIncomeColorOptions(data.colorOptions ?? []);
      setIncomeIconOptions(data.iconOptions ?? []);
    } catch (e) {
      setIncomeError(e instanceof Error ? e.message : "加载收入分类失败");
    } finally {
      setIncomeLoading(false);
    }
  }

  useEffect(() => {
    loadIncomeCategories();
  }, []);

  async function loadRules() {
    setRulesLoading(true);
    setRulesError(null);
    try {
      const res = await fetch("/api/category-rules");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "加载分类规则失败");
      }
      setRules(data.rules ?? []);
    } catch (e) {
      setRulesError(e instanceof Error ? e.message : "加载分类规则失败");
    } finally {
      setRulesLoading(false);
    }
  }

  useEffect(() => {
    if (tab === "rules") {
      loadRules();
    }
  }, [tab]);

  async function handleLearnFromHistory() {
    setLearningFromHistory(true);
    setRulesError(null);
    setRulesMessage(null);
    try {
      const res = await fetch("/api/category-rules/learn-from-history", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "从历史学习失败");
      }
      setRulesMessage(
        `已扫描 ${data.scannedTransactions} 条历史交易，识别 ${data.uniqueMerchants} 个商户，生成/更新 ${data.rulesCreated} 条规则。`
      );
      await loadRules();
    } catch (e) {
      setRulesError(e instanceof Error ? e.message : "从历史学习失败");
    } finally {
      setLearningFromHistory(false);
    }
  }

  async function handleDeleteRule(id: string) {
    if (!window.confirm("确定删除该分类规则？")) return;
    setDeletingRuleId(id);
    try {
      const res = await fetch(`/api/category-rules/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "删除规则失败");
      }
      setRules((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      setRulesError(e instanceof Error ? e.message : "删除规则失败");
    } finally {
      setDeletingRuleId(null);
    }
  }

  function resetForm() {
    setEditingId(null);
    setName(DEFAULT_NEW_CATEGORY.name);
    setColor(DEFAULT_NEW_CATEGORY.color);
    setIcon(DEFAULT_NEW_CATEGORY.icon);
  }

  function startEdit(item: Category) {
    setEditingId(item.id);
    setName(item.name);
    setColor(item.color);
    setIcon(item.icon);
  }

  function resetMethodForm() {
    setEditingMethodId(null);
    setMethodName(DEFAULT_NEW_PAYMENT_METHOD.name);
    setMethodColor(DEFAULT_NEW_PAYMENT_METHOD.color);
    setMethodIcon(DEFAULT_NEW_PAYMENT_METHOD.icon);
  }

  function startMethodEdit(item: PaymentMethod) {
    setEditingMethodId(item.id);
    setMethodName(item.name);
    setMethodColor(item.color);
    setMethodIcon(item.icon);
  }

  function resetIncomeForm() {
    setEditingIncomeId(null);
    setIncomeName(DEFAULT_NEW_INCOME_CATEGORY.name);
    setIncomeColor(DEFAULT_NEW_INCOME_CATEGORY.color);
    setIncomeIcon(DEFAULT_NEW_INCOME_CATEGORY.icon);
  }

  function startIncomeEdit(item: Category) {
    setEditingIncomeId(item.id);
    setIncomeName(item.name);
    setIncomeColor(item.color);
    setIncomeIcon(item.icon);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setSaving(true);
    setError(null);
    try {
      const isEditing = Boolean(editingId);
      const url = isEditing
        ? `/api/expense-categories/${encodeURIComponent(editingId!)}`
        : "/api/expense-categories";
      const method = isEditing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          color,
          icon,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "保存类目失败");
      }
      await loadCategories();
      resetForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存类目失败");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Category) {
    const ok = window.confirm(`确认删除类目「${item.name}」吗？`);
    if (!ok) return;
    setError(null);
    try {
      const res = await fetch(
        `/api/expense-categories/${encodeURIComponent(item.id)}`,
        { method: "DELETE" }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "删除类目失败");
      }
      await loadCategories();
      if (editingId === item.id) {
        resetForm();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "删除类目失败");
    }
  }

  async function handleMethodSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = methodName.trim();
    if (!trimmedName) return;

    setMethodSaving(true);
    setMethodError(null);
    try {
      const isEditing = Boolean(editingMethodId);
      const url = isEditing
        ? `/api/payment-methods/${encodeURIComponent(editingMethodId!)}`
        : "/api/payment-methods";
      const method = isEditing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          color: methodColor,
          icon: methodIcon,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "保存支付方式失败");
      }
      await loadMethods();
      await loadImportMappings();
      resetMethodForm();
    } catch (e) {
      setMethodError(e instanceof Error ? e.message : "保存支付方式失败");
    } finally {
      setMethodSaving(false);
    }
  }

  async function handleMethodDelete(item: PaymentMethod) {
    const ok = window.confirm(`确认删除支付方式「${item.name}」吗？`);
    if (!ok) return;
    setMethodError(null);
    try {
      const res = await fetch(
        `/api/payment-methods/${encodeURIComponent(item.id)}`,
        { method: "DELETE" }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "删除支付方式失败");
      }
      await loadMethods();
      await loadImportMappings();
      if (editingMethodId === item.id) {
        resetMethodForm();
      }
    } catch (e) {
      setMethodError(e instanceof Error ? e.message : "删除支付方式失败");
    }
  }

  async function handleImportMappingChange(
    channel: string,
    paymentMethodId: string
  ) {
    setImportMapSavingChannel(channel);
    setImportMapError(null);
    try {
      const res = await fetch("/api/import-channel-payments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, paymentMethodId }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        throw new Error(data?.error || "保存映射失败");
      }
      await loadImportMappings();
    } catch (e) {
      setImportMapError(e instanceof Error ? e.message : "保存映射失败");
    } finally {
      setImportMapSavingChannel(null);
    }
  }

  async function handleIncomeSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = incomeName.trim();
    if (!trimmedName) return;

    setIncomeSaving(true);
    setIncomeError(null);
    try {
      const isEditing = Boolean(editingIncomeId);
      const url = isEditing
        ? `/api/income-categories/${encodeURIComponent(editingIncomeId!)}`
        : "/api/income-categories";
      const method = isEditing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          color: incomeColor,
          icon: incomeIcon,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "保存收入分类失败");
      }
      await loadIncomeCategories();
      resetIncomeForm();
    } catch (e) {
      setIncomeError(e instanceof Error ? e.message : "保存收入分类失败");
    } finally {
      setIncomeSaving(false);
    }
  }

  async function handleIncomeDelete(item: Category) {
    const ok = window.confirm(`确认删除收入分类「${item.name}」吗？`);
    if (!ok) return;
    setIncomeError(null);
    try {
      const res = await fetch(
        `/api/income-categories/${encodeURIComponent(item.id)}`,
        { method: "DELETE" }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "删除收入分类失败");
      }
      await loadIncomeCategories();
      if (editingIncomeId === item.id) {
        resetIncomeForm();
      }
    } catch (e) {
      setIncomeError(e instanceof Error ? e.message : "删除收入分类失败");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          分类配置
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          统一管理支出分类、收入分类和支付方式，支持扩展、删除，并配置颜色和图标。
        </p>
      </div>

      <div className="inline-flex rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <button
          type="button"
          onClick={() => setTab("categories")}
          className={`rounded-full px-4 py-1.5 text-xs transition ${
            tab === "categories"
              ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          }`}
        >
          支出分类管理
        </button>
        <button
          type="button"
          onClick={() => setTab("incomeCategories")}
          className={`rounded-full px-4 py-1.5 text-xs transition ${
            tab === "incomeCategories"
              ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          }`}
        >
          收入分类管理
        </button>
        <button
          type="button"
          onClick={() => setTab("methods")}
          className={`rounded-full px-4 py-1.5 text-xs transition ${
            tab === "methods"
              ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          }`}
        >
          支付方式管理
        </button>
        <button
          type="button"
          onClick={() => setTab("rules")}
          className={`rounded-full px-4 py-1.5 text-xs transition ${
            tab === "rules"
              ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          }`}
        >
          分类规则
        </button>
      </div>

      {tab === "categories" ? (
        <>
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-2">
              <h2 className="text-sm font-medium">
                {editingItem ? "编辑支出分类" : "新增支出分类"}
              </h2>
              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">
                    支出分类名称
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例如：交通"
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-500"
                  />
                </div>

                <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">颜色</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {colorOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setColor(item)}
                        className={`h-7 w-7 rounded-full border-2 transition ${
                          color === item
                            ? "border-zinc-900 dark:border-zinc-100"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: item }}
                        aria-label={`选择颜色 ${item}`}
                        title={item}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">图标</div>
                  <div className="mt-2 flex max-h-36 flex-wrap gap-2 overflow-auto rounded-xl border border-zinc-200 p-2 dark:border-zinc-800">
                    {iconOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setIcon(item)}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-base transition ${
                          icon === item
                            ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                            : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        }`}
                        title={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-zinc-500 dark:text-zinc-400">预览</div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white" style={{ backgroundColor: color }}>
                    <span>{icon}</span>
                    <span>{name.trim() || "支出分类名称"}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving || !name.trim()}
                    className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
                  >
                    {saving ? "保存中..." : editingItem ? "保存修改" : "新增支出分类"}
                  </button>
                  {editingItem && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-1.5 text-xs text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                      取消编辑
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium">当前支出分类列表</h2>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                    双击任意分类可快速进入编辑，也可在操作下拉中编辑/删除。
                  </p>
                </div>
                {loading && <span className="text-xs text-zinc-400">加载中...</span>}
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-xs">
                  <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <tr>
                      <th className="py-2 pr-4">分类</th>
                      <th className="py-2 pr-4">颜色</th>
                      <th className="py-2 pr-4">图标</th>
                      <th className="py-2 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {categories.length ? (
                      categories.map((item) => (
                        <tr key={item.id} onDoubleClick={() => startEdit(item)}>
                          <td className="py-2 pr-4">
                            <span
                              className="inline-flex cursor-pointer items-center gap-2 rounded-full px-2 py-0.5 text-white"
                              style={{ backgroundColor: item.color }}
                              title="双击编辑该分类"
                            >
                              <span>{item.icon}</span>
                              <span>{item.name}</span>
                            </span>
                          </td>
                          <td className="py-2 pr-4">
                            <div className="inline-flex items-center gap-2">
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span>{item.color}</span>
                            </div>
                          </td>
                          <td className="py-2 pr-4 text-lg">{item.icon}</td>
                          <td className="py-2 text-right">
                            <div className="inline-flex items-center gap-2">
                              <select
                                defaultValue=""
                                onChange={(e) => {
                                  const action = e.target.value;
                                  if (action === "edit") {
                                    startEdit(item);
                                  } else if (action === "delete" && item.name !== "待确认") {
                                    void handleDelete(item);
                                  }
                                  e.target.value = "";
                                }}
                                className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[10px] text-zinc-600 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:focus:border-zinc-500"
                              >
                                <option value="">操作</option>
                                <option value="edit">编辑</option>
                                <option value="delete" disabled={item.name === "待确认"}>
                                  删除
                                </option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-6 text-center text-xs text-zinc-400"
                        >
                          暂无支出分类数据
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : tab === "incomeCategories" ? (
        <>
          {incomeError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              {incomeError}
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-2">
              <h2 className="text-sm font-medium">
                {editingIncomeItem ? "编辑收入分类" : "新增收入分类"}
              </h2>
              <form className="mt-4 space-y-4" onSubmit={handleIncomeSubmit}>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">
                    收入分类名称
                  </label>
                  <input
                    value={incomeName}
                    onChange={(e) => setIncomeName(e.target.value)}
                    placeholder="例如：兼职"
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-500"
                  />
                </div>

                <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">颜色</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {incomeColorOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setIncomeColor(item)}
                        className={`h-7 w-7 rounded-full border-2 transition ${
                          incomeColor === item
                            ? "border-zinc-900 dark:border-zinc-100"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: item }}
                        aria-label={`选择颜色 ${item}`}
                        title={item}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">图标</div>
                  <div className="mt-2 flex max-h-36 flex-wrap gap-2 overflow-auto rounded-xl border border-zinc-200 p-2 dark:border-zinc-800">
                    {incomeIconOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setIncomeIcon(item)}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-base transition ${
                          incomeIcon === item
                            ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                            : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        }`}
                        title={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-zinc-500 dark:text-zinc-400">预览</div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white" style={{ backgroundColor: incomeColor }}>
                    <span>{incomeIcon}</span>
                    <span>{incomeName.trim() || "收入分类名称"}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={incomeSaving || !incomeName.trim()}
                    className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
                  >
                    {incomeSaving
                      ? "保存中..."
                      : editingIncomeItem
                      ? "保存修改"
                      : "新增收入分类"}
                  </button>
                  {editingIncomeItem && (
                    <button
                      type="button"
                      onClick={resetIncomeForm}
                      className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-1.5 text-xs text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                      取消编辑
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">当前收入分类列表</h2>
                {incomeLoading && (
                  <span className="text-xs text-zinc-400">加载中...</span>
                )}
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-xs">
                  <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <tr>
                      <th className="py-2 pr-4">分类</th>
                      <th className="py-2 pr-4">颜色</th>
                      <th className="py-2 pr-4">图标</th>
                      <th className="py-2 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {incomeCategories.length ? (
                      incomeCategories.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2 pr-4">
                            <span
                              className="inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-white"
                              style={{ backgroundColor: item.color }}
                            >
                              <span>{item.icon}</span>
                              <span>{item.name}</span>
                            </span>
                          </td>
                          <td className="py-2 pr-4">
                            <div className="inline-flex items-center gap-2">
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span>{item.color}</span>
                            </div>
                          </td>
                          <td className="py-2 pr-4 text-lg">{item.icon}</td>
                          <td className="py-2 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => startIncomeEdit(item)}
                                className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                              >
                                编辑
                              </button>
                              <button
                                type="button"
                                disabled={item.name === "待确认"}
                                onClick={() => handleIncomeDelete(item)}
                                className="rounded-full border border-red-200 px-2 py-0.5 text-[10px] text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/40 dark:hover:bg-red-950/40"
                              >
                                删除
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-6 text-center text-xs text-zinc-400"
                        >
                          暂无收入分类数据
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {methodError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              {methodError}
            </div>
          )}
          {importMapError && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
              {importMapError}
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-2">
              <h2 className="text-sm font-medium">
                {editingMethod ? "编辑支付方式" : "新增支付方式"}
              </h2>
              <form className="mt-4 space-y-4" onSubmit={handleMethodSubmit}>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">
                    支付方式名称
                  </label>
                  <input
                    value={methodName}
                    onChange={(e) => setMethodName(e.target.value)}
                    placeholder="例如：浦发银行卡"
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-500"
                  />
                </div>

                <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">颜色</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {methodColorOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setMethodColor(item)}
                        className={`h-7 w-7 rounded-full border-2 transition ${
                          methodColor === item
                            ? "border-zinc-900 dark:border-zinc-100"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: item }}
                        aria-label={`选择颜色 ${item}`}
                        title={item}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">图标</div>
                  <div className="mt-2 flex max-h-36 flex-wrap gap-2 overflow-auto rounded-xl border border-zinc-200 p-2 dark:border-zinc-800">
                    {methodIconOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setMethodIcon(item)}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-base transition ${
                          methodIcon === item
                            ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                            : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        }`}
                        title={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-zinc-500 dark:text-zinc-400">预览</div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white" style={{ backgroundColor: methodColor }}>
                    <span>{methodIcon}</span>
                    <span>{methodName.trim() || "支付方式名称"}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={methodSaving || !methodName.trim()}
                    className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
                  >
                    {methodSaving
                      ? "保存中..."
                      : editingMethod
                      ? "保存修改"
                      : "新增支付方式"}
                  </button>
                  {editingMethod && (
                    <button
                      type="button"
                      onClick={resetMethodForm}
                      className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-1.5 text-xs text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                      取消编辑
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">当前支付方式列表</h2>
                {methodLoading && (
                  <span className="text-xs text-zinc-400">加载中...</span>
                )}
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-xs">
                  <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <tr>
                      <th className="py-2 pr-4">支付方式</th>
                      <th className="py-2 pr-4">颜色</th>
                      <th className="py-2 pr-4">图标</th>
                      <th className="py-2 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {methods.length ? (
                      methods.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2 pr-4">
                            <span
                              className="inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-white"
                              style={{ backgroundColor: item.color }}
                            >
                              <span>{item.icon}</span>
                              <span>{item.name}</span>
                            </span>
                          </td>
                          <td className="py-2 pr-4">
                            <div className="inline-flex items-center gap-2">
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span>{item.color}</span>
                            </div>
                          </td>
                          <td className="py-2 pr-4 text-lg">{item.icon}</td>
                          <td className="py-2 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => startMethodEdit(item)}
                                className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                              >
                                编辑
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMethodDelete(item)}
                                className="rounded-full border border-red-200 px-2 py-0.5 text-[10px] text-red-500 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/40"
                              >
                                删除
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-6 text-center text-xs text-zinc-400"
                        >
                          暂无支付方式数据
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-medium">
                  AI 记账 · 导入类型与默认支付方式
                </h2>
                {importMapLoading && (
                  <span className="text-xs text-zinc-400">加载映射…</span>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                与「AI 自动记账」页选择的导入类型（channel）对应。当模型无法从账单明确判断
                method 时，使用此处映射的支付方式（须为上方列表中的名称）。提示词中的说明会随本表自动更新。
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-xs">
                  <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <tr>
                      <th className="py-2 pr-4">导入类型</th>
                      <th className="py-2 pr-4">channel</th>
                      <th className="py-2">默认支付方式</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {importMappings.length ? (
                      importMappings.map((m) => (
                        <tr key={m.channel}>
                          <td className="py-2 pr-4">{m.label}</td>
                          <td className="py-2 pr-4 font-mono text-[10px] text-zinc-500">
                            {m.channel}
                          </td>
                          <td className="py-2">
                            <select
                              value={m.paymentMethodId ?? ""}
                              disabled={
                                !methods.length ||
                                importMapSavingChannel === m.channel
                              }
                              onChange={(e) => {
                                const v = e.target.value;
                                if (v) {
                                  void handleImportMappingChange(m.channel, v);
                                }
                              }}
                              className="max-w-full rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs outline-none focus:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-500"
                            >
                              {!m.paymentMethodId && (
                                <option value="">请选择</option>
                              )}
                              {methods.map((pm) => (
                                <option key={pm.id} value={pm.id}>
                                  {pm.name}
                                </option>
                              ))}
                            </select>
                            {importMapSavingChannel === m.channel && (
                              <span className="ml-2 text-[10px] text-zinc-400">
                                保存中…
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-6 text-center text-xs text-zinc-400"
                        >
                          {importMapLoading
                            ? "加载中…"
                            : "暂无映射数据，请刷新页面"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === "rules" && (
        <>
          {rulesError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              {rulesError}
            </div>
          )}
          {rulesMessage && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
              {rulesMessage}
            </div>
          )}

          <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-sm font-medium">
                  自动分类规则
                </h2>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  系统会从你确认过的账单中自动学习「商户名 → 分类」的映射规则。下次导入同一商户的账单时，不再需要手动确认分类。
                </p>
              </div>
              <button
                type="button"
                onClick={handleLearnFromHistory}
                disabled={learningFromHistory}
                className="inline-flex shrink-0 items-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
              >
                {learningFromHistory
                  ? "正在学习..."
                  : "从历史交易学习规则"}
              </button>
            </div>

            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              共 {rules.length} 条规则
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <tr>
                    <th className="py-2 pr-4">类型</th>
                    <th className="py-2 pr-4">商户名</th>
                    <th className="py-2 pr-4">自动归类</th>
                    <th className="py-2 pr-4">来源</th>
                    <th className="py-2">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {rulesLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-6 text-center text-xs text-zinc-400"
                      >
                        加载中…
                      </td>
                    </tr>
                  ) : rules.length > 0 ? (
                    rules.map((rule) => (
                      <tr key={rule.id} className="align-top">
                        <td className="py-2 pr-4">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              rule.type === "expense"
                                ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                            }`}
                          >
                            {rule.type === "expense" ? "支出" : "收入"}
                          </span>
                        </td>
                        <td className="py-2 pr-4 font-medium">
                          {rule.merchantName}
                        </td>
                        <td className="py-2 pr-4">
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                            {rule.category}
                          </span>
                        </td>
                        <td className="py-2 pr-4 text-[10px] text-zinc-400">
                          {rule.source === "manual" ? "手动" : "自动学习"}
                        </td>
                        <td className="py-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteRule(rule.id)}
                            disabled={deletingRuleId === rule.id}
                            className="text-[10px] text-red-500 hover:text-red-700 disabled:text-zinc-300 dark:hover:text-red-400"
                          >
                            {deletingRuleId === rule.id
                              ? "删除中…"
                              : "删除"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-6 text-center text-xs text-zinc-400"
                      >
                        暂无分类规则。点击「从历史交易学习规则」按钮，可从已有的交易记录中自动生成规则。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
