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

  test("two pairs matching with diff date formats", () => {
    const result = computePairs(`EmpID,ProjectID,DateFrom,DateTo
                  3,45,2019-11-01,NULL
                  4,45,2023-05-05,2023-06-06

                  1,12,Nov 1 2019,NULL
                  2,12,2020-01-01,2021-01-01
                  2,12,2023-01-01,2023-01-20
                  2,12,2024-09-01,09/28/2024

                  22,10,2010-03-22,NULL`);

    expect(result).toStrictEqual([
      { employeeID1: 1, employeeID2: 2, projectID: 12, daysWorked: 412 },
      { employeeID1: 3, employeeID2: 4, projectID: 45, daysWorked: 32 },
    ]);
  });
});
