import { ImageIcon, CloseIcon } from "../../libs/mui-icons";

import {
    ActionIconButton,
    AppDialog,
    ImageItem
} from "../../components";

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
            <div className="dialog__icon--container">
                <ActionIconButton
                    Icon={ImageIcon}
                    onClick={onOpen}
                    iconClassName="dialog__icon"
                />
            </div>

            <AppDialog open={open} onClose={onClose}>
                <div className="dialog__header">
                    <span className="dialog__title">Перегляд фотографій</span>

                    <ActionIconButton
                        Icon={CloseIcon}
                        onClick={onClose}
                        iconClassName="dialog__icon"
                    />
                </div>

                <div className="dialog__images--container">
                    <div className="dialog__images">
                        {imageList.map((item, index) => (
                            <ImageItem
                                key={item}
                                src={item}
                                alt={`image_${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </AppDialog>
        </>
    );
}