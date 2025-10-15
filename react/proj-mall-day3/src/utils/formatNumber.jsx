export function formatNumber(n) {
  if (n === null || n === undefined) return "0";
  const s = String(n).replace(/[^\d-]/g, ""); // 숫자/음수만
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
