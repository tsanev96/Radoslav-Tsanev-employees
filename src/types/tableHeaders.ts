export const TableHeaders = {
  EmpID: "employeeID",
  ProjectID: "projectID",
  DateFrom: "dateFrom",
  DateTo: "dateTo",
} as const;

export type TableHeaders = (typeof TableHeaders)[keyof typeof TableHeaders];
