import { TABLE_HEADERS_INPUT } from "../constants/tableHeaders";
import { MS_PER_DAY } from "../constants/time";
import type {
  Employee,
  EmployeePairProject,
  PairsResult,
} from "../types/employee";
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

interface OverlapArgs {
  emp1: WorkPeriod;
  emp2: WorkPeriod;
}

function getOverlapDays({ emp1, emp2 }: OverlapArgs): number {
  const overlapStartDate = Math.max(+emp1.dateFrom, +emp2.dateFrom);
  const overlapEndDate = Math.min(+emp1.dateTo, +emp2.dateTo);
  const hasOverlap = overlapStartDate <= overlapEndDate;

  return hasOverlap
    ? Math.ceil((overlapEndDate - overlapStartDate) / MS_PER_DAY)
    : 0;
}

function createEmployeePairKey(
  employeeId1: number,
  employeeId2: number,
  projectId: number,
) {
  return `${Math.min(employeeId1, employeeId2)}_${Math.max(
    employeeId1,
    employeeId2,
  )}_${projectId}`;
}

function convertPairMapToArray(pairsMap: EmployeePairProject): PairsResult[] {
  return Array.from(pairsMap.values());
}

function getPairsForProject(csvData: Employee[]): EmployeePairProject {
  const map = createProjectMap(csvData);

  const results: EmployeePairProject = new Map();

  for (const [projectID, employees] of map.entries()) {
    for (let i = 0; i < employees.length; i++) {
      for (let j = i + 1; j < employees.length; j++) {
        const emp1 = employees[i];
        const emp2 = employees[j];
        const keyPair = createEmployeePairKey(
          emp1.employeeID,
          emp2.employeeID,
          projectID,
        );

        const overlapDays = getOverlapDays({ emp1, emp2 });

        if (overlapDays <= 0) {
          continue;
        }

        const existingPair = results.get(keyPair);

        if (existingPair) {
          existingPair.daysWorked += overlapDays;
        } else {
          results.set(keyPair, {
            employeeID1: emp1.employeeID,
            employeeID2: emp2.employeeID,
            projectID: projectID,
            daysWorked: overlapDays,
          });
        }
      }
    }
  }

  console.log("results ", results);
  results.forEach((value, key) => {
    console.log("value ", value);
  });

  return results;
}

export function computePairs(csv: string) {
  const parsed = parseCSVfile(csv, TABLE_HEADERS_INPUT);
  const pairsForProject = getPairsForProject(parsed);
  return convertPairMapToArray(pairsForProject);
}
