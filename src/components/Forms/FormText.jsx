import { useState, forwardRef } from "react";

import { TextField, InputAdornment } from "../../libs/mui";

import { Visibility, VisibilityOff } from "../../libs/mui-icons";

import { ActionIconButton } from "../../components";

export const FormText = forwardRef(
    ({
        label,
        type,
        name,
        value,
        onChange,
        onBlur,
        className,
        disabled,
        error
    }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="form">
            <span className={`form__label ${className}`}>{label}</span>

            <TextField
                inputRef={ref}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`form__field ${className}`}
                variant="outlined"
                type={isPassword && showPassword ? "text" : type}
                disabled={disabled}
                error={error}
                slotProps={{
                    input: isPassword
                        ? {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <ActionIconButton
                                        Icon={showPassword ? VisibilityOff : Visibility }
                                        onClick={() => setShowPassword(prev => !prev)}
                                        iconClassName="form__icon"
                                    />
                                </InputAdornment>
                            )
                        }
                        : {}
                }}
            />
        </div>
    );
});