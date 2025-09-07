import type { PairsResult } from "../types/employee";

interface PaginateArgs {
  items: PairsResult[];
  page: number;
  pageSize: number;
}

export function paginate({
  items,
  page,
  pageSize,
}: PaginateArgs): PairsResult[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
