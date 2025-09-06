import type { Employee } from "../types/employee";
import type { ProjectMap } from "../types/projectMap";

export function createProjectMap(csvData: Employee[]): ProjectMap {
  const map: ProjectMap = new Map();
  csvData.forEach(({ employeeID, projectID, dateFrom, dateTo }) => {
    const periods = map.get(projectID);
    if (periods) {
      periods.push({ employeeID, dateFrom, dateTo });
    } else {
      map.set(projectID, [{ employeeID, dateFrom, dateTo }]);
    }
  });

  console.log(map);
  return map;
}
