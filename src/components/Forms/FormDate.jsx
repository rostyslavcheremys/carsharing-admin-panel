import { forwardRef } from "react";

import { DatePicker } from "../../libs/mui";

export const FormDate = forwardRef(
    ({ label, value, onChange, disabled, error, disablePast = false }, ref) => {
        return (
            <div className="form">
                <span className="form__label">{label}</span>

                <DatePicker
                    value={value}
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