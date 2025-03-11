import React from 'react';
import clsx from 'clsx';

type Props = {
    value: number;
}

const RateChip: React.FC<Props> = ({ value }) => {
    return (
        <div className={clsx('text-xs mt-2', value < 0 ? 'text-red-600' : 'text-green-700')}>
            {value < 0 ? "▼" : "▲"} {value.toFixed(2)}%
        </div>
    )
}

export default RateChip;