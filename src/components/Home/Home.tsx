import React, { useState } from "react";
import type { PairsResult } from "../../types/employee";
import { computePairs } from "../../utils/employeePairs";
import DataTable from "../DataTable/DataTable";
import styles from "./Home.module.css";
import UploadFileButton from "../UploadFileButton/UploadFileButton";

export default function Home() {
  const [data, setData] = useState<PairsResult[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const pairsData = computePairs(reader.result as string);
        setData(pairsData);
        setFileName(file.name);
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
    <div className={styles.container}>
      <h1 className={styles.headline}>
        Pair of employees who have worked together
      </h1>
      <p className={styles.description}>
        If you want to see which pair of employees have worked the most, import
        a CSV file in the following format: EmpID, ProjectID, DateFrom, DateTo
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UploadFileButton
        onHandleUploadFile={handleUploadFile}
        fileName={fileName}
      />
      {data.length > 0 && <DataTable data={data} />}
    </div>
  );
}
