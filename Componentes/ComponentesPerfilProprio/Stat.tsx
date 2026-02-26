import React from 'react';

interface StatProps {
    value: number;
    label: string;
}

export const Stat: React.FC<StatProps> = ({ value, label }) => {
    return (
        <div className="stat">
            <p className="value">{value}</p>
            <p className="label">{label}</p>
        </div>
    );
};