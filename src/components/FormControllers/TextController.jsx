import { Controller } from "react-hook-form";

import { FormText } from "../../components";

export const TextController = ({
                                    control,
                                    name,
                                    label,
                                    type,
                                    className="",
                                    defaultValue,
                                    rules,
                                    disabled
                                }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <>
                    <FormText
                        label={label}
                        type={type}
                        className={className}
                        value={field.value}
                        disabled={disabled}
                        error={!!fieldState.error}
                        {...field}
                    />
                    {fieldState.error &&
                        <p className="form-controller__error">{fieldState.error.message}</p>
                    }
                </>
            )}
        />
    );
}