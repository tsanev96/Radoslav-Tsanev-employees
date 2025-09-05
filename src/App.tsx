import './App.css'

interface Employee {
  EmpID: number;
  ProjectID: number;
  DateFrom: string;
  DateTo: string;
}

function App() {
  function parseCSV(text: string) {
    const rows = text.split("\n").map(line => line.trim());
    const headers = rows[0].split(",").map(h => h.trim());
    const data = rows.slice(1).map(row => {
      const values = row.split(",").map(v => v.trim());
      return Object.fromEntries(headers.map((key, index) => [key, values[index]]))
    });
    return data;
  }

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const data = parseCSV(reader.result as string);
    };
  }


  return (
    <>
      <h1>Pair of employees who have worked together</h1>
      <p>Import a CSV file in the following format: EmpID, ProjectID, DateFrom, DateTo</p>
      <input
        type="file"
        accept=".csv"
        onChange={handleUploadFile}
      />
    </>
  )
}

export default App
