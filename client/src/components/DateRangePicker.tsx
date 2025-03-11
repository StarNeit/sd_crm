import React from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

type Props = {
    value: DateValueType;
    onChange: (value: DateValueType) => void;
}

const DateRangePicker: React.FC<Props> = ({ value, onChange }) => {
    return (
        <Datepicker value={value} onChange={onChange} />
    )
}

export default DateRangePicker;