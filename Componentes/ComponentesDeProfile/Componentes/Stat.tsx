
import React from 'react';

interface Props {
    value: number | string;
    label: string;
    onClick?: () => void;
}

export const Stat: React.FC<Props> = ({ value, label, onClick }) => {
    return (
        <div className={`stat ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
            <span className="value">{value}</span>
            <span className="label">{label}</span>
        </div>
    );
};
