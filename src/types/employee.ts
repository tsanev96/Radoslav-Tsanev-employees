export interface Employee {
  employeeID: number;
  projectID: number;
  dateFrom: Date;
  dateTo: Date;
}

export interface PairsResult {
  employeeID1: number;
  employeeID2: number;
  projectID: number;
  daysWorked: number;
}

/** Format: empId1_empId2_projectId
 * where empId1 < empId2 (to avoid duplicates)
 * ex: "143_218_10"
 */
type EmployeePairKey = string;

export type EmployeePairProject = Map<EmployeePairKey, PairsResult>;
