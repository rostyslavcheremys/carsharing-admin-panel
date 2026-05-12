import { getNestedValue, getLabel } from "../../utils";

import { DetailsItem } from "../../components";

export const Details = ({ data, details, className }) => {
    return(

        <div className={`details ${className || ''}`}>
            {details.map(({ label, key, map, suffix, formatter }) => {
                const value = getNestedValue(data, key);

                if (value === undefined || value === null || value === "") return null;

                const displayValue = formatter
                    ? formatter(value, data)
                    : map
                        ? getLabel(value, map)
                        : value;

                return (
                    <DetailsItem
                        key={key}
                        label={label}
                        value={suffix ? `${displayValue} ${suffix}` : displayValue}
                    />
                );
            })}
        </div>
    );
}