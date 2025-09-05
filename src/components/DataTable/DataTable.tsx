import { TABLE_HEADERS } from '../../constants/tableHeaders';
import type { Employee } from '../../types/employee'
import styles from "./DataTable.module.css";

interface Props {
    data: Employee[];
}

// Employee ID #1, Employee ID #2, Project ID, Days worked
export default function DataTable({ data }: Props) {
    return (
        <div className="container">
            <h2 className="headline">Some content for table</h2>
            <div className="table">
                <div className={styles.tableHeader}>
                    {TABLE_HEADERS.map(header => (
                        <p>{header}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
