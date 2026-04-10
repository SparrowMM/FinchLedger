"use client";

import { useEffect, useState } from "react";

/**
 * 通用的静态数据 fetch hook（仅在组件挂载时请求一次）。
 * 适用于分类列表、支付方式等不随用户操作变化的元数据。
 *
 * @param url 请求地址，组件生命周期内不变时可直接传字符串字面量。
 * @returns 响应 JSON（泛型 T），未完成时为 null。
 */
export function useApiFetch<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: T) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        // 元数据加载失败时静默处理，页面可用降级数据正常显示
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return data;
}
