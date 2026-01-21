import { Controller } from "react-hook-form";

import { FormSelect } from "../../components";

export const SelectController = ({ control, name, label, rules = {}, options = [] }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <>
                    <FormSelect
                        label={label}
                        name={name}
                        value={field.value}
                        onChange={field.onChange}
                        options={options}
                    />
                    {fieldState.error && (
                        <p className="form-controller__error">{fieldState.error.message}</p>
                    )}
                </>
            )}
        />
    );
};
