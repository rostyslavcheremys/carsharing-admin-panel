import {
    forwardRef,
    useEffect,
    useMemo
} from "react";

import {
    Button,
    Grid,
    Card,
    CardMedia,
    CardActions,
    IconButton,
} from "../../libs/mui";

import {
    DeleteIcon,
    ArrowBackIcon,
    ArrowForwardIcon
} from "../../libs/mui-icons";

export const FormUpload = forwardRef(
    ({ label, value = [], onChange, className = "", disabled, name }, ref) => {

        const previews = useMemo(
            () =>
                value.map(item =>
                    item instanceof File
                        ? URL.createObjectURL(item)
                        : item
                ),
            [value]
        );

        useEffect(() => {
            return () => {
                previews.forEach(url => {
                    if (url.startsWith("blob:")) {
                        URL.revokeObjectURL(url);
                    }
                });
            };
        }, [previews]);

        const handleFileChange = (e) => {
            const newFiles = Array.from(e.target.files);
            onChange([...value, ...newFiles]);
            e.target.value = "";
        }

        const handleRemove = (index) => {
            onChange(value.filter((_, i) => i !== index));
        }

        const handleMove = (index, direction) => {
            const newArr = [...value];
            const target = index + direction;

            if (target >= 0 && target < newArr.length) {
                [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
                onChange(newArr);
            }
        }

        return (
            <div className="form">
                {value.length > 0 && (
                    <Grid className="form__gallery">
                        {value.map((item, index) => (
                            <Grid className="form__grid" key={index}>
                                <Card className="form__card" variant="outlined">
                                    <CardMedia
                                        className="form__image"
                                        image={previews[index]}
                                        component="img"
                                        alt={`image-${index}`}
                                    />

                                    <CardActions className="form__actions">
                                        <IconButton
                                            onClick={() => handleMove(index, -1)}
                                            disabled={index === 0}
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>

                                        <IconButton onClick={() => handleRemove(index)}>
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton
                                            onClick={() => handleMove(index, 1)}
                                            disabled={index === value.length - 1}
                                        >
                                            <ArrowForwardIcon />
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
                    disabled={disabled}
                    className="form__upload"
                >
                    {value.length
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