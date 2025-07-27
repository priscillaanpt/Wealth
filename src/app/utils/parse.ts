export function parseCurrency(value: string | number) {
  if (typeof value === "string") {
    value = Number(value);
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function parseRate(value: string | number) {
  const num = typeof value === "string" ? value.replace(/[^\d.]/g, "") : value.toString();
  return `${num} %`;
}