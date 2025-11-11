import React from "react";
import './styles.css';
import { formatRupiah } from "../../helper/helper";

interface SummaryCardData {
    title: string;
    value: number | string;
    className?: string;
};

interface SummaryCardProps {
    data: Array<SummaryCardData> | [];
    loading?: boolean;
    error?: string;
};


const SummaryCard: React.FC<SummaryCardProps> = ({
    data,
    loading = false,
    error = "",
}) => {
    return (
        <div className="summary">
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                data.map((item, index) => (
                    <div key={index} className={`summary-item ${item.className}`}>
                        <div className="label">{item.title}</div>
                        <div className={`value ${item.className}`}>
                            {formatRupiah(typeof item.value === 'number' ? item.value : parseInt(item.value))}
                        </div>
                    </div>
                )))
            }
        </div>
    );
};

export default SummaryCard;