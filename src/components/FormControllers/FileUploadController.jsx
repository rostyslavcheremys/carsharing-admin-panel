import { Controller } from "react-hook-form";

import { FormUpload } from "../../components";

export const FileUploadController = ({
                                         control,
                                         name,
                                         label,
                                         className = "",
                                         rules,
                                         disabled
                                    }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={[]}
            render={({ field: { onChange, value, ref, name }, fieldState }) => (
                <>
                    <FormUpload
                        label={label}
                        name={name}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        className={className}
                        disabled={disabled}
                    />
                    {fieldState.error &&
                        <p className="form-controller__error">{fieldState.error.message}</p>
                    }
                </>
            )}
        />
    );
}