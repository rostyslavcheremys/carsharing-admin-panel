import { Controller } from "react-hook-form";

import { FormField } from "../../components";

export const InputController = ({ control, name, label, type, className="",  defaultValue, rules, disabled }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <>
                    <FormField label={label} type={type} className={className} value={field.value ?? ""} {...field} disabled={disabled} />
                    {fieldState.error && <p className="form-controller__error">{fieldState.error.message}</p>}
                </>
            )}
        />
    );
};