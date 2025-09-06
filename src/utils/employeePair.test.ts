import { computePairs } from "./employeePairs";

describe("data", () => {
  test("single pair matching 10 days", () => {
    const result = computePairs(`EmpID,ProjectID,DateFrom,DateTo
                  143,12,2013-11-01,2014-11-01
                  218,12,2013-11-10,2013-11-20
                  22,10,2010-03-22,NULL`);

    expect(result).toStrictEqual([
      { employeeID1: 143, employeeID2: 218, projectID: 12, daysWorked: 10 },
    ]);
  });

  test("single pair matching 15 days where one employee worked on the same project at diff time", () => {
    const result = computePairs(`EmpID,ProjectID,DateFrom,DateTo
                  143,12,2013-11-01,NULL
                  218,12,2013-11-10,2013-11-20
                  218,12,2025-09-01,2025-09-06
                  22,10,2010-03-22,NULL`);

    expect(result).toStrictEqual([
      { employeeID1: 143, employeeID2: 218, projectID: 12, daysWorked: 15 },
    ]);
  });
});
