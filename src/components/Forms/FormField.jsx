import { useState, forwardRef } from "react";

import {
    TextField,
    IconButton,
    InputAdornment
} from "../../libs/mui";

import {
    Visibility,
    VisibilityOff
} from "../../libs/mui-icons";

export const FormField = forwardRef(({ label, type, name, value, onChange, onBlur, className, disabled }, ref) => {
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
                slotProps={{
                    input: isPassword
                        ? {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(prev => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ?  <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                        : {}
                }}
            />
        </div>
    );
});