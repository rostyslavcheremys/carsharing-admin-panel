import {
    Dialog,
    ImageList,
    IconButton,
    ImageListItem
} from "../../libs/mui";

import {
    ImageIcon,
    CloseIcon,
} from "../../libs/mui-icons";

import { ImageItem } from "../../components";

export const ImageDialog = ({
                                open,
                                onOpen,
                                onClose,
                                images }) => {
    if (!images || (Array.isArray(images) && images.length === 0)) {
        return "—";
    }

    const imageList = Array.isArray(images) ? images : [images];

    return (
        <>
            <div className="dialog__icon">
                <IconButton onClick={onOpen}>
                    <ImageIcon className="dialog__icon--photos" />
                </IconButton>
            </div>

            <Dialog
                className="dialog"
                open={open}
                onClose={onClose}
                disableRestoreFocus
                disablePortal
            >
                <div className="dialog__header">
                    <span className="dialog__title">Перегляд фотографій</span>

                    <IconButton onClick={onClose}>
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
}