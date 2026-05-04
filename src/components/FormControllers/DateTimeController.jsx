import { Controller } from "react-hook-form";

import { FormDateTime } from "../../components";

export const DateTimeController = ({
                                       control,
                                       name,
                                       label,
                                       rules,
                                       disabled,
                                       disablePast = false,
                                       disabledRanges
                                     }) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
            <>
                <FormDateTime
                    label={label}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    error={!!fieldState.error}
                    disablePast={disablePast}
                    disabledRanges={disabledRanges}
                />
                {fieldState.error &&
                    <p className="form-controller__error">{fieldState.error.message}</p>
                }
            </>
        )}
    />
);