interface WorkPeriod {
  employeeID: number;
  dateFrom: Date;
  dateTo: Date;
}

export type ProjectMap = Map<number, WorkPeriod[]>;
