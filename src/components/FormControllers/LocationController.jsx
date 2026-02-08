import { useState } from "react";

import { Controller } from "react-hook-form";

import { FormLocation } from "../../components";

import { MapDialog } from "../../components";

export const LocationController = ({
                                       control,
                                       name,
                                       label,
                                       rules,
                                       disabled
                                   }) => {
    const [open, setOpen] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={null}
            render={({ field: { value, onChange }, fieldState }) => (
                <>
                    <FormLocation
                        label={label}
                        value={value}
                        disabled={disabled}
                        onOpen={() => setOpen(true)}
                    />

                    <MapDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        latitude={value?.lat}
                        longitude={value?.lng}
                        status={value?.status}
                        selectable
                        onSelect={(location) => {
                            onChange(location);
                            setOpen(false);
                        }}
                    />

                    {fieldState.error && (
                        <p className="form-controller__error">
                            {fieldState.error.message}
                        </p>
                    )}
                </>
            )}
        />
    );
}