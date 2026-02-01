

import {
    Dialog,
    IconButton,
} from "../../libs/mui";

import {
    MyLocationIcon,
    CloseIcon,
} from "../../libs/mui-icons";

import { MapItem } from "../../components";

export const MapDialog = ({
                              open,
                              onOpen,
                              onClose,
                              latitude,
                              longitude}) => {
    if (!latitude || !longitude) {
        return "—";
    }

    const location = {
        lat: Number(latitude),
        lng: Number(longitude)
    };

    return (
        <>
            <div className="dialog__icon">
                <IconButton onClick={onOpen}>
                    <MyLocationIcon className="dialog__icon--location" />
                </IconButton>
            </div>

            <Dialog
                className="dialog"
                open={open}
                onClose={onClose}
                disableRestoreFocus={true}
            >
                <div className="dialog__header">
                    <span className="dialog__title">Місцезнаходження автомобіля</span>

                    <IconButton onClick={onClose}>
                        <CloseIcon className="dialog__icon--close" />
                    </IconButton>
                </div>

                <div className="dialog__map">
                    <MapItem location={location} />
                </div>
            </Dialog>
        </>
    );
}