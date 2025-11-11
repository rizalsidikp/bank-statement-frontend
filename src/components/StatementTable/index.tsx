import { useMemo, useState } from "react";
import './styles.css';
import { formatRupiah, formatTimestamp } from "../../helper/helper";


interface StatementData {
    timestamp: number;
    name: string;
    type: "DEBIT" | "CREDIT";
    amount: number;
    status: "SUCCESS" | "FAILED" | "PENDING";
    description: string;
};

interface StatementProps {
    data: Array<StatementData> | [];
    loading?: boolean;
    error?: string;
};

type TransactionSort = {
    timestamp: number;
    name: string;
    type: string;
    amount: number;
    status: string;
};


const StatementTable: React.FC<StatementProps> = ({
    data,
    loading = false,
    error = "",
}) => {

    const [sortKey, setSortKey] = useState<keyof TransactionSort>("timestamp");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const setSort = (key: keyof TransactionSort) => {
        if (key === sortKey) {
            setSortDir(s => (s === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    const sortedStatements = useMemo(() => {
        const sorted = data?.length ? [...data] : [];
        sorted.sort((a, b) => {
            const x = a[sortKey];
            const y = b[sortKey];

            if (typeof x === "number" && typeof y === "number") {
                return sortDir === "asc" ? x - y : y - x;
            }

            return sortDir === "asc"
                ? String(x).localeCompare(String(y))
                : String(y).localeCompare(String(x));
        });
        return sorted;
    }, [data, sortKey, sortDir]);


    const [page, setPage] = useState(1);
    const perPage = 10;
    const totalPages = Math.ceil(sortedStatements.length / perPage) || 1;
    const currentData = sortedStatements.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <button
                                type="button"
                                className="sortable"
                                onClick={() => setSort("timestamp")}
                                aria-label="Sort by statement date"
                                aria-sort={sortDir === 'asc' ? 'ascending' : 'descending'}
                            >
                                Statement Date {sortKey === "timestamp" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                className="sortable"
                                onClick={() => setSort("name")}
                                aria-label="Sort by name"
                                aria-sort={sortDir === 'asc' ? 'ascending' : 'descending'}
                            >
                                Name {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                className="sortable info-cell"
                                onClick={() => setSort("type")}
                                aria-label="Sort by type"
                                aria-sort={sortDir === 'asc' ? 'ascending' : 'descending'}
                            >
                                Type {sortKey === "type" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                className="sortable"
                                onClick={() => setSort("amount")}
                                aria-label="Sort by amount"
                                aria-sort={sortDir === 'asc' ? 'ascending' : 'descending'}
                            >
                                Amount {sortKey === "amount" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                className="sortable"
                                onClick={() => setSort("status")}
                                aria-label="Sort by status"
                                aria-sort={sortDir === 'asc' ? 'ascending' : 'descending'}
                            >
                                Status {sortKey === "status" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                            </button>
                        </th>
                        <th>
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={6} className="muted">Loading...</td></tr>
                    ) : error ? (
                        <tr><td colSpan={6} className="error">{error}</td></tr>
                    ) : currentData.length === 0 ? (
                        <tr><td colSpan={6} className="muted">No statements found</td></tr>
                    ) : (
                        currentData.map((tx, i) => (
                            <tr key={i}>
                                <td className="info-cell">{formatTimestamp(tx.timestamp)}</td>
                                <td className="info-cell">{tx.name}</td>
                                <td className="info-cell">{tx.type}</td>
                                <td>{formatRupiah(tx.amount)}</td>
                                <td>
                                    <span className={`status ${tx.status.toLowerCase()}`}>
                                        {tx.status === "PENDING" && "⚠️"}
                                        {tx.status === "FAILED" && "❌"}
                                        &nbsp;{tx.status}
                                    </span>
                                </td>
                                <td>{tx.description}</td>
                            </tr>
                        )))}
                </tbody>
            </table>

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    );
};

export default StatementTable;