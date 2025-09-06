export interface WorkPeriod {
  employeeID: number;
  dateFrom: Date;
  dateTo: Date;
}

type ProjectID = number;

export type ProjectMap = Map<ProjectID, WorkPeriod[]>;
