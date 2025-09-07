import { TABLE_HEADERS_INPUT } from "../constants/tableHeaders";
import { MS_PER_DAY } from "../constants/time";
import type {
  Employee,
  EmployeePairProject,
  PairsResult,
} from "../types/employee";
import type { ProjectMap, WorkPeriod } from "../types/projectMap";
import { parseCSVfile } from "./csvParser";
import { sortPairs } from "./sort";

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

function makeEmployeePairKey(
  emp1: number,
  emp2: number,
  projectId: number,
): { key: string; id1: number; id2: number } {
  const id1 = Math.min(emp1, emp2);
  const id2 = Math.max(emp1, emp2);

  return {
    key: `${id1}_${id2}_${projectId}`,
    id1,
    id2,
  };
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

        const overlapDays = getOverlapDays({ emp1, emp2 });

        if (overlapDays <= 0 || emp1.employeeID === emp2.employeeID) {
          continue;
        }

        const { key, id1, id2 } = makeEmployeePairKey(
          emp1.employeeID,
          emp2.employeeID,
          projectID,
        );

        const existingPair = results.get(key);

        if (existingPair) {
          existingPair.daysWorked += overlapDays;
        } else {
          results.set(key, {
            employeeID1: id1,
            employeeID2: id2,
            projectID: projectID,
            daysWorked: overlapDays,
          });
        }
      }
    }
  }

  return results;
}

export function computePairs(csv: string): PairsResult[] {
  const parsed = parseCSVfile(csv, TABLE_HEADERS_INPUT);
  const pairsForProject = getPairsForProject(parsed);
  const pairsArray = convertPairMapToArray(pairsForProject);
  return sortPairs(pairsArray, "daysWorked", "desc");
}
