import { useState } from "react";
import { TABLE_HEADERS_OUTPUT } from "../../constants/tableHeaders";
import type { PairsResult } from "../../types/employee";
import styles from "./DataTable.module.css";
import classNames from "classnames";
import { paginate } from "../../utils/paginate";

interface Props {
  data: PairsResult[];
}

export default function DataTable({ data }: Props) {
  const [page, setPage] = useState(1);

  const pageSize = 3;

  const pagedData = paginate({ items: data, page, pageSize });

  const isMultiPage = data.length > pageSize;

  return (
    <div className={styles.container}>
      <section className={styles.table}>
        <div className={styles.tableHeader}>
          {TABLE_HEADERS_OUTPUT.map((header) => (
            <span>{header}</span>
          ))}
        </div>
        <div className={styles.tableBody}>
          {pagedData.map(
            ({ employeeID1, employeeID2, projectID, daysWorked }) => (
              <div
                className={styles.tableRow}
                key={`${employeeID1}_${employeeID2}_${projectID}`}
              >
                <span data-label={TABLE_HEADERS_OUTPUT[0]}>{employeeID1}</span>
                <span data-label={TABLE_HEADERS_OUTPUT[1]}>{employeeID2}</span>
                <span data-label={TABLE_HEADERS_OUTPUT[2]}>{projectID}</span>
                <span data-label={TABLE_HEADERS_OUTPUT[3]}>{daysWorked}</span>
              </div>
            ),
          )}
        </div>
      </section>

      <div className={styles.pagination}>
        {isMultiPage && (
          <button
            className={classNames(styles.arrow, styles.prev, {
              [styles.disabled]: page === 1,
            })}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          />
        )}
        <span>Page {page}</span>
        {isMultiPage && (
          <button
            className={classNames(styles.arrow, {
              [styles.disabled]: page * pageSize >= data.length,
            })}
            onClick={() =>
              setPage((p) => (p * pageSize < data.length ? p + 1 : p))
            }
          />
        )}
      </div>
    </div>
  );
}
