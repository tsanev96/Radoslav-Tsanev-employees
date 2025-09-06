import { useEffect, useState } from "react";
import "./App.css";
import { computePairs, type PairsResult } from "./utils/employeePairs";

function App() {
  const [data, setData] = useState<PairsResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("final output: ", data);
  }, [data]);
  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const pairsData = computePairs(reader.result as string);
        setData(pairsData);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something failed with parsing the file";
        setError(errorMessage);
      }
    };

    reader.onerror = () => {};
  };

  return (
    <div>
      <h1>Pair of employees who have worked together</h1>
      <p>
        If you want to see which pair of employees have worked the most, import
        a CSV file in the following format: EmpID, ProjectID, DateFrom, DateTo
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="file" accept=".csv" onChange={handleUploadFile} />
      {/* {data && <DataTable data={data} />} */}
    </div>
  );
}

export default App;
