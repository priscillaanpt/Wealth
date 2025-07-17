import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToRupiah(value: string) {
  const cleaned = value.replace(/[^0-9.,]/g, "");
  const normalized = cleaned.replace(/,/, ".");

  const [integerPart, decimalPart] = normalized.split(".");
  if (!integerPart) return "0";

  const formattedInt = new Intl.NumberFormat("id-ID").format(
    Number(integerPart),
  );

  if (decimalPart !== undefined && decimalPart.length > 0) {
    return `${formattedInt},${decimalPart}`;
  }

  return formattedInt;
}
