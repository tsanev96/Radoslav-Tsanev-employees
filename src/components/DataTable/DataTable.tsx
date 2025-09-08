import { useEffect, useState } from "react";
import { TABLE_HEADERS_OUTPUT } from "../../constants/tableHeaders";
import type { PairsResult } from "../../types/employee";
import styles from "./DataTable.module.css";
import classNames from "classnames";
import { paginate } from "../../utils/paginate";
import { sortPairs } from "../../utils/sort";
import { scrollToTop } from "../../utils/scroll";

interface Props {
  data: PairsResult[];
}

export default function DataTable({ data }: Props) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof PairsResult>("daysWorked");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const pageSize = 10;

  const sortedData = sortPairs(data, sortKey, sortDir);
  const pagedData = paginate({ items: sortedData, page, pageSize });

  const isMultiPage = data.length > pageSize;

  useEffect(() => {
    setPage(1);
  }, [sortKey, sortDir]);

  function handleSort(key: keyof PairsResult) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleNext() {
    setPage((p) => (p * pageSize < data.length ? p + 1 : p));
    scrollToTop();
  }

  function handlePrev() {
    setPage((p) => Math.max(1, p - 1));
    scrollToTop();
  }

  return (
    <div className={styles.container}>
      <section className={styles.table}>
        <div className={styles.tableHeader}>
          {TABLE_HEADERS_OUTPUT.map(({ title, key, sortable }) => {
            const isSortableKey = sortable && key === sortKey;

            return (
              <span
                key={title}
                onClick={sortable && key ? () => handleSort(key) : undefined}
              >
                {title}
                {sortable && key && (
                  <span className={styles.sortIcon}>
                    {isSortableKey ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
                  </span>
                )}
              </span>
            );
          })}
        </div>
        <div className={styles.tableBody}>
          {pagedData.map((el, index) => (
            <div
              className={styles.tableRow}
              key={`${el.employeeID1}_${el.employeeID2}_${el.projectID}_${index}`}
            >
              {TABLE_HEADERS_OUTPUT.map(({ title, key }) => (
                <span key={key} data-label={title}>
                  {el[key]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.pagination}>
        {isMultiPage && (
          <button
            className={classNames(styles.arrow, styles.prev, {
              [styles.disabled]: page === 1,
            })}
            onClick={handlePrev}
          />
        )}
        <span>Page {page}</span>
        {isMultiPage && (
          <button
            className={classNames(styles.arrow, {
              [styles.disabled]: page * pageSize >= data.length,
            })}
            onClick={handleNext}
          />
        )}
      </div>
    </div>
  );
}
