import type { PairsResult } from "../types/employee";
import { TableHeaders } from "../types/tableHeaders";

interface TableHeader {
  title: string;
  key: keyof PairsResult;
  sortable?: boolean;
}

export const TABLE_HEADERS_OUTPUT: TableHeader[] = [
  { title: "Employee ID #1", key: "employeeID1" },
  { title: "Employee ID #2", key: "employeeID2" },
  { title: "Project ID", key: "projectID", sortable: true },
  { title: "Days worked", key: "daysWorked", sortable: true },
];

export const TABLE_HEADERS_INPUT: TableHeaders[] = [
  TableHeaders.EmpID,
  TableHeaders.ProjectID,
  TableHeaders.DateFrom,
  TableHeaders.DateTo,
];
