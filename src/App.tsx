import { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable/DataTable";
import type { Employee } from "./types/employee";

enum TableHeaders {
  EmpID = "employeeID",
  ProjectID = "projectID",
  DateFrom = "dateFrom",
  DateTo = "dateTo",
}

function App() {
  const [data, setData] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  const headers: TableHeaders[] = [
    TableHeaders.EmpID,
    TableHeaders.ProjectID,
    TableHeaders.DateFrom,
    TableHeaders.DateTo,
  ];

  function parseNumber(value: string, headerValue: keyof Employee) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new Error(
        `Invalid value for ${headerValue}: ${value}, must be a number`,
      );
    }
    return parsedValue;
  }

  function parseDate(value: string, headerValue: keyof Employee) {
    const isStillWorking =
      value.toLowerCase() === "null" && headerValue === "dateTo";
    const date = isStillWorking ? new Date() : new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(
        `Invalid value for ${headerValue}: ${value}, must be a correct date format`,
      );
    }
    return date;
  }

  function parseCSVfile(text: string) {
    const rows = text.split("\n").map((line) => line.trim());
    // const headers = rows[0].split(",").map(h => h.trim());
    const data: Employee[] = rows.slice(1).map((row) => {
      const values = row.split(",").map((v) => v.trim());

      return headers.reduce((acc, header, index) => {
        const value = values[index];
        if (
          header === TableHeaders.EmpID ||
          header === TableHeaders.ProjectID
        ) {
          const parsedNumber = parseNumber(value, header);
          acc[header] = parsedNumber;
        } else if (header === "dateFrom" || header === "dateTo") {
          const date = parseDate(value, header);
          acc[header] = date;
        }
        return acc;
      }, {} as Employee);
    });

    return data;
  }

  /*
    143, 12, 2013-11-01, 2014-01-05
    218, 10, 2012-05-16, NULL
    143, 10, 2009-01-01, 2011-04-27


    12: {

    }
  */

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const data = parseCSVfile(reader.result as string);
        setData(data);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something failed with parsing the file",
        );
      }
    };

    reader.onerror = () => {};
  };

  const test = "sdasad";

  return (
    <div>
      <h1>Pair of employees who have worked together</h1>
      <p>
        If you want to see which pair of employees have worked the most, import
        a CSV file in the following format: EmpID, ProjectID, DateFrom, DateTo
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="file" accept=".csv" onChange={handleUploadFile} />
      {data.length > 0 && <DataTable data={data} />}
    </div>
  );
}

export default App;
