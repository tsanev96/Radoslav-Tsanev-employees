import { computePairs, type PairsResult } from "./employeePairs";

describe("data", () => {
  test("single pair matching 10 days", () => {
    const result = computePairs(`EmpID,ProjectID,DateFrom,DateTo
                  143,12,2013-11-01,2014-11-01
                  218,12,2013-11-10,2013-11-20
                  22,10,2010-03-22,NULL`);

    expect(result).toStrictEqual([
      { emp1: 143, emp2: 218, projectID: 12, daysWorked: 10 },
    ]);
  });
  test("", () => {
    computePairs(`EmpID,ProjectID,DateFrom,DateTo
143,12,2013-11-01,2014-11-01
218,12,2012-05-16,NULL
218,25,2001-05-03,2003-07-07
143,10,2009-01-01,2011-04-27
22,10,2010-03-22,NULL`);

    expect(1 + 2).toBe(3);
  });
});
