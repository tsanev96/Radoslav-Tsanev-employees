import { MS_PER_DAY } from "../constants/time";
import { computePairs } from "./employeePairs";

function diffDays(start: Date, end: Date): number {
  return Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY);
}

describe("data", () => {
  test("NULL date to", () => {
    const today = new Date();
    const start = new Date("2023-06-01");
    const expectedDays = diffDays(start, today);

    const result = computePairs(`empid,ProjectID,DateFrom,DATETO
1,99,2023-01-01,NULL
2,99,2023-06-01,NULL`);

    expect(result).toStrictEqual([
      {
        employeeID1: 1,
        employeeID2: 2,
        projectID: 99,
        daysWorked: expectedDays,
      },
    ]);
  });

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
      { employeeID1: 3, employeeID2: 4, projectID: 45, daysWorked: 32 },
      { employeeID1: 1, employeeID2: 2, projectID: 12, daysWorked: 412 },
    ]);
  });

  test("multiple projects", () => {
    const result = computePairs(`EmpID,ProjectID,DateFrom,DateTo
1,10,2019-01-01,2020-01-01
1,10,2020-02-02,2020-03-03
2,10,2019-06-01,2020-06-01
3,10,2019-11-01,NULL

4,12,Jan 5 2020,12/31/2020
5,12,2020-03-01,2020-09-01
6,12,2020-06-15,2021-01-10

7,15,2021-02-01,2021-12-01
8,15,2021-06-01,NULL

9,20,1541894400000,1550620800000
10,20,2019-01-15,2019-03-15
11,20,2019-01-10,2019-04-01

12,25,2022-01-01,2022-07-07
13,25,2022-03-01,2022-05-20
13,25,June 10 2022,July 10 2022,
14,25,2022-06-01,2022-12-31
15,25,2022-04-15,2022-09-01

17,30,1658275200000,July 25 2022
16,30,2022-06-01,2022-09-01
17,30,2022-03-01,July 15 2022
17,30,1658275200000,2022-07-25

`);

    expect(result).toStrictEqual([
      { employeeID1: 1, employeeID2: 2, projectID: 10, daysWorked: 244 },
      { employeeID1: 1, employeeID2: 3, projectID: 10, daysWorked: 91 },
      { employeeID1: 2, employeeID2: 3, projectID: 10, daysWorked: 213 },
      { employeeID1: 4, employeeID2: 5, projectID: 12, daysWorked: 184 },
      { employeeID1: 4, employeeID2: 6, projectID: 12, daysWorked: 199 },
      { employeeID1: 5, employeeID2: 6, projectID: 12, daysWorked: 78 },
      { employeeID1: 7, employeeID2: 8, projectID: 15, daysWorked: 183 },
      { employeeID1: 9, employeeID2: 10, projectID: 20, daysWorked: 36 },
      { employeeID1: 9, employeeID2: 11, projectID: 20, daysWorked: 41 },
      { employeeID1: 10, employeeID2: 11, projectID: 20, daysWorked: 59 },
      { employeeID1: 12, employeeID2: 13, projectID: 25, daysWorked: 108 },
      { employeeID1: 12, employeeID2: 14, projectID: 25, daysWorked: 36 },
      { employeeID1: 12, employeeID2: 15, projectID: 25, daysWorked: 83 },
      { employeeID1: 13, employeeID2: 15, projectID: 25, daysWorked: 65 },
      { employeeID1: 13, employeeID2: 14, projectID: 25, daysWorked: 30 },
      { employeeID1: 14, employeeID2: 15, projectID: 25, daysWorked: 92 },
      { employeeID1: 16, employeeID2: 17, projectID: 30, daysWorked: 54 },
    ]);
  });
});
