import { forwardRef } from "react";

import { Rating } from "../../libs/mui";

export const FormRating = forwardRef(
    (
        {
            label,
            value,
            onChange,
            onBlur,
            className = "",
            disabled,
            error,
            precision = 1,
            max = 5,
        },
        ref
    ) => {
        return (
            <div className="form form--rating">
                <span className={`form__label form__label--rating ${className}`}>
                    {label}
                </span>

                <Rating
                    ref={ref}
                    name="rating"
                    value={value ?? 0}
                    className="form__rating"
                    onChange={(_, newValue) => onChange(newValue)}
                    onBlur={onBlur}
                    precision={precision}
                    max={max}
                    disabled={disabled}
                />

                {error && (
                    <p className="form-controller__error">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);