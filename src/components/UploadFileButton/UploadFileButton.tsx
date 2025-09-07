import styles from "./UploadFileButton.module.css";

interface Props {
  fileName: string | null;
  onHandleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadFileButton({
  fileName,
  onHandleUploadFile,
}: Props) {
  return (
    <div className={styles.container}>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        onChange={onHandleUploadFile}
        style={{ display: "none" }}
      />
      <label className={styles.uploadBtn} htmlFor="file-upload">
        Upload CSV
      </label>
      {fileName && <span className={styles.fileName}> {fileName} </span>}
    </div>
  );
}
