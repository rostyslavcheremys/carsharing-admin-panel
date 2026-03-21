import { forwardRef } from "react";
import dayjs from "dayjs";

import { DatePicker } from "../../libs/mui";

export const FormDatePicker = forwardRef(
    ({ label, value, onChange, disabled, error, disablePast = false }, ref) => {
        return (
            <div className="form">
                <span className="form__label">{label}</span>

                <DatePicker
                    value={value ? dayjs(value) : null}
                    onChange={onChange}
                    disablePast={disablePast}
                    disabled={disabled}
                    format="DD.MM.YYYY"
                    slotProps={{
                        textField: {
                            inputRef: ref,
                            error: error,
                            className: "form__field",
                        },
                    }}
                />
            </div>
        );
    }
);