import { Controller } from "react-hook-form";

import { FormRating } from "../../components";

export const RatingController = ({
                                         control,
                                         name,
                                         label,
                                         className = "",
                                         defaultValue = 0,
                                         rules,
                                         disabled,
                                         precision = 1,
                                         max = 5,
                                     }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <FormRating
                    label={label}
                    className={className}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={disabled}
                    precision={precision}
                    max={max}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};