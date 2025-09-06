import { TABLE_HEADERS_INPUT } from "../constants/tableHeaders";
import { MS_PER_DAY } from "../constants/time";
import type { Employee } from "../types/employee";
import type { ProjectMap, WorkPeriod } from "../types/projectMap";
import { parseCSVfile } from "./csvParser";

function createProjectMap(csvData: Employee[]): ProjectMap {
  const map: ProjectMap = new Map();
  csvData.forEach(({ employeeID, projectID, dateFrom, dateTo }) => {
    const periods = map.get(projectID);
    if (periods) {
      periods.push({ employeeID, dateFrom, dateTo });
    } else {
      map.set(projectID, [{ employeeID, dateFrom, dateTo }]);
    }
  });

  return map;
}
export interface PairsResult {
  emp1: number;
  emp2: number;
  projectID: number;
  daysWorked: number;
}

interface OverlapArgs {
  emp1: WorkPeriod;
  emp2: WorkPeriod;
}

function getOverlapDays({ emp1, emp2 }: OverlapArgs): number {
  const overlapStartDate = Math.max(+emp1.dateFrom, +emp2.dateFrom);
  const overlapEndDate = Math.min(+emp1.dateTo, +emp2.dateTo);

  console.log({
    overlapStartDate: new Date(overlapStartDate),
    overlapEndDate: new Date(overlapEndDate),
  });
  const hasOverlap = overlapStartDate <= overlapEndDate;

  console.log(
    "overlapdays",
    Math.ceil((overlapEndDate - overlapStartDate) / MS_PER_DAY),
  );
  return hasOverlap
    ? Math.ceil((overlapEndDate - overlapStartDate) / MS_PER_DAY)
    : 0;
}

function getPairsForProject(csvData: Employee[]): PairsResult[] {
  const map = createProjectMap(csvData);

  const results: PairsResult[] = [];

  for (const [projectId, employees] of map.entries()) {
    for (let i = 0; i < employees.length; i++) {
      for (let j = i + 1; j < employees.length; j++) {
        const emp1 = employees[i];
        const emp2 = employees[j];

        const overlapDays = getOverlapDays({ emp1, emp2 });

        if (overlapDays > 0) {
          results.push({
            emp1: emp1.employeeID,
            emp2: emp2.employeeID,
            projectID: projectId,
            daysWorked: overlapDays,
          });
        }
      }
    }
  }

  return results;
}

export function computePairs(csv: string) {
  const parsed = parseCSVfile(csv, TABLE_HEADERS_INPUT);
  return getPairsForProject(parsed);
}
