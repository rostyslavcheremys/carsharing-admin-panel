import { Controller } from "react-hook-form";

import { FormDatePicker } from "../../components";

export const DatePickerController = ({
                                         control,
                                         name,
                                         label,
                                         rules,
                                         disabled,
                                         disablePast = false,
                                     }) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
            <>
                <FormDatePicker
                    label={label}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    error={!!fieldState.error}
                    disablePast={disablePast}
                />
                {fieldState.error &&
                    <p className="form-controller__error">{fieldState.error.message}</p>
                }
            </>
        )}
    />
);