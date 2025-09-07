import type { Employee } from "../types/employee";
import { TableHeaders } from "../types/tableHeaders";
import { parseDate, parseNumber } from "./parserData";

export function parseCSVfile(text: string, headers: TableHeaders[]) {
  const rows = text
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim());

  const data: Employee[] = rows.slice(1).map((row) => {
    const values = row.split(",").map((v) => v.trim());

    return headers.reduce((acc, header, index) => {
      const value = values[index];
      if (header === TableHeaders.EmpID || header === TableHeaders.ProjectID) {
        const parsedNumber = parseNumber(value, header);
        acc[header] = parsedNumber;
      } else if (header === "dateFrom" || header === "dateTo") {
        const date = parseDate(value, header);
        acc[header] = date;
      }
      return acc;
    }, {} as Employee);
  });

  return data;
}
