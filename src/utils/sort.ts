import type { PairsResult } from "../types/employee";

export function sortPairs<T extends keyof PairsResult>(
  data: PairsResult[],
  key: T,
  direction: "asc" | "desc" = "asc",
): PairsResult[] {
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });
}
