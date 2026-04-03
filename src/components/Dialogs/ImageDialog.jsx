import {
    Dialog,
    ImageList,
    ImageListItem
} from "../../libs/mui";

import {
    ImageIcon,
    CloseIcon,
} from "../../libs/mui-icons";

import { ActionIconButton, ImageItem } from "../../components";

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
                <ActionIconButton
                    Icon={ImageIcon}
                    onClick={onOpen}
                    iconClassName="dialog__icon--photos"
                />
            </div>

            <Dialog
                className="dialog"
                open={open}
                onClose={onClose}
                disableEnforceFocus={true}
                disableRestoreFocus={true}
                disablePortal={false}
            >
                <div className="dialog__header">
                    <span className="dialog__title">Перегляд фотографій</span>

                    <ActionIconButton
                        Icon={CloseIcon}
                        onClick={onClose}
                        iconClassName="dialog__icon--close"
                    />
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