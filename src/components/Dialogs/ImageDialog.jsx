import { useState } from "react";

import {
    Dialog,
    ImageList,
    IconButton,
    ImageListItem
} from "../../libs/mui.js";

import {
    PhotoLibraryIcon,
    CloseIcon,
} from "../../libs/mui-icons.js";

import { ImageItem } from "../../components";

export const ImageDialog = ({ images }) => {
    const [open, setOpen] = useState(false);

    if (!images || (Array.isArray(images) && images.length === 0)) {
        return "—";
    }

    const imageList = Array.isArray(images) ? images : [images];

    const handleOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setOpen(false);
    };

    return (
        <>
            <div className="dialog__icon" onClick={handleOpen}>
                <PhotoLibraryIcon className="dialog__icon--photos" />
            </div>

            <Dialog className="dialog" open={open} onClose={handleClose}>
                <div className="dialog__header">
                    <span className="dialog__title">Перегляд фотографій</span>

                    <IconButton onClick={handleClose}>
                        <CloseIcon className="dialog__icon--close" />
                    </IconButton>
                </div>

                <div className="dialog__content--images">
                    <ImageList className="dialog__images">
                        {imageList.map((item, index) => (
                            <ImageListItem key={index}>
                                <ImageItem src={item} alt={`image_${index + 1}`}/>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </Dialog>
        </>
    );
};