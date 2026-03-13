import { getNestedValue, getLabel } from "../../utils";

import { DetailsItem } from "../../components";

export const Details = ({ data, details }) => {
    return(
        <div className="details">
            {details.map(({ label, key, map, suffix, formatter }) => {
                const value = getNestedValue(data, key);

                if (value === undefined || value === null || value === "") return null;

                const display = formatter
                    ? formatter(value)
                    : map
                        ? getLabel(value, map)
                        : value;

                return (
                    <DetailsItem
                        key={key}
                        label={label}
                        value={suffix ? `${display} ${suffix}` : display}
                    />
                );
            })}
        </div>
    );
}