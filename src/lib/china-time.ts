const CHINA_OFFSET_HOURS = 8;

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function parseChinaDateTimeToUtc(dateStr: string, timeStr?: string): Date {
  const match = dateStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  let hour = 0;
  let minute = 0;
  if (timeStr) {
    const timeMatch = timeStr.trim().match(/^(\d{2}):(\d{2})/);
    if (timeMatch) {
      hour = Number(timeMatch[1]);
      minute = Number(timeMatch[2]);
    }
  }

  // Stored Date is UTC instant, this converts "China local time" to that instant.
  return new Date(Date.UTC(year, month - 1, day, hour - CHINA_OFFSET_HOURS, minute, 0));
}

export function formatDateTimeInChina(date: Date): { date: string; time: string } {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";

  const safeYear = year || String(date.getUTCFullYear());
  const safeMonth = month || pad2(date.getUTCMonth() + 1);
  const safeDay = day || pad2(date.getUTCDate());

  return {
    date: `${safeYear}-${safeMonth}-${safeDay}`,
    time: `${hour}:${minute}`,
  };
}
