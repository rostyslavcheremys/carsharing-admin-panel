import { forwardRef } from "react";

import dayjs from "dayjs";

import { DateTimePicker } from "../../libs/mui";

import { isDateInRanges } from "../../utils";

export const FormDateTime = forwardRef((
    {
        label,
        value,
        onChange,
        disabled,
        error,
        disablePast = false,
        disabledRanges
    },
    ref
) => {
    return (
        <div className="form">
            <span className="form__label">{label}</span>

            <DateTimePicker
                value={value || dayjs(value)}
                onChange={onChange}
                disabled={disabled}
                disablePast={disablePast}
                shouldDisableDate={(date) =>
                    isDateInRanges(date, disabledRanges)
                }
                shouldDisableTime={(value) =>
                    isDateInRanges(value, disabledRanges)
                }
                slotProps={{
                    textField: {
                        inputRef: ref,
                        error,
                        className: "form__field",
                    },
                }}
            />
        </div>
    );
});