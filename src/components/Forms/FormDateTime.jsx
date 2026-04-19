import { forwardRef } from "react";
import dayjs from "dayjs";

import { DateTimePicker } from "../../libs/mui";


export const FormDateTime = forwardRef(
    ({ label, value, onChange, disabled, error, disablePast = false }, ref) => {
        return (
            <div className="form">
                <span className="form__label">{label}</span>

                <DateTimePicker
                    value={value ? dayjs(value) : null}
                    disabled={disabled}
                    disablePast={disablePast}
                    onChange={onChange}
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