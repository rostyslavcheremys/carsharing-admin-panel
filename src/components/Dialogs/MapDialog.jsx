import { useState } from "react";

import {
    Dialog,
    IconButton,
} from "../../libs/mui.js";

import {
    MyLocationIcon,
    CloseIcon,
} from "../../libs/mui-icons.js";

import { MonitoringMap } from "../../components";

export const MapDialog = ({ latitude, longitude }) => {
    const [open, setOpen] = useState(false);

    if (!latitude || !longitude) {
        return "—";
    }
    const location = {
        lat: Number(latitude),
        lng: Number(longitude)
    };

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
                <MyLocationIcon className="dialog__icon--location" />
            </div>

            <Dialog className="dialog" open={open} onClose={handleClose}>
                <div className="dialog__header">
                    <span className="dialog__title">Місцезнаходження автомобіля</span>

                    <IconButton onClick={handleClose}>
                        <CloseIcon className="dialog__icon--close" />
                    </IconButton>
                </div>

                <div className="dialog__map">
                    <MonitoringMap location={location} />
                </div>
            </Dialog>
        </>
    );
}