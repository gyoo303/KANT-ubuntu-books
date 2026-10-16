// 2026-09-30 → 09.30
export const toMonthDay = (date: string) =>
    `${date.slice(5, 7)}.${date.slice(8, 10)}`;

// 2026-10 → 10월
export const toMonthLabel = (month: string) => `${Number(month.slice(5, 7))}월`;

// 오늘 날짜 (YYYY-MM-DD, 한국 시간)
export const todayKst = () =>
    new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
