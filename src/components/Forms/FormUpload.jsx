import { forwardRef } from "react";

import {
    Button,
    Grid,
    Card,
    CardMedia,
    CardActions,
    IconButton,
} from "../../libs/mui.js";

import {
    FileUploadIcon,
    DeleteIcon,
    ArrowBackIcon,
    ArrowForwardIcon
} from "../../libs/mui-icons.js";

export const FormUpload = forwardRef(({ label, value, onChange, className = "", disabled, name }, ref) => {
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const updatedFiles = [...(value || []), ...newFiles];

        onChange(updatedFiles);
        e.target.value = "";
    };

    const handleRemove = (index) => {
        const newFiles = value.filter((_, i) => i !== index);
        onChange(newFiles);
    };

    const handleMove = (index, direction) => {
        const newFiles = [...value];
        const targetIndex = index + direction;

        if (targetIndex >= 0 && targetIndex < newFiles.length) {
            [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
            onChange(newFiles);
        }
    };

    return (
        <div className="form">
            {value?.length > 0 && (
                <Grid className="form__gallery">
                    {value.map((file, index) => (
                        <Grid className="form__grid" key={index}>
                            <Card className="form__card" variant="outlined">
                                <CardMedia
                                    className="form__image"
                                    image={URL.createObjectURL(file)}
                                    component="img"
                                    alt={`image-${index}`}
                                />

                                <CardActions className="form__actions">
                                    <IconButton
                                        onClick={() => handleMove(index, -1)}
                                        disabled={index === 0}
                                    >
                                        <ArrowBackIcon className="form__icon" />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => handleRemove(index)}
                                    >
                                        <DeleteIcon className="form__icon" />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => handleMove(index, 1)}
                                        disabled={index === value.length - 1}
                                    >
                                        <ArrowForwardIcon className="form__icon" />
                                    </IconButton>
                                </CardActions>

                                <div className="form__badge">{index + 1}</div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <span className={`form__label ${className}`}>{label}</span>

            <Button
                component="label"
                variant="outlined"
                startIcon={<FileUploadIcon />}
                disabled={disabled}
                className={`form__upload ${className}`}
            >
                {value?.length > 0
                    ? `Додати ще (вибрано: ${value.length})`
                    : "Натисніть для завантаження"}
                <input
                    ref={ref}
                    name={name}
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Button>
        </div>
    );
});