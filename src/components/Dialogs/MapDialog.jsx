import { useState } from "react";

import {
    Dialog,
    IconButton,
} from "../../libs/mui";

import {
    MyLocationIcon,
    CloseIcon,
} from "../../libs/mui-icons";

import { MapContainer, AppButton } from "../../components";

import { DEFAULT_LOCATION } from "../../constants";

export const MapDialog = ({
                              open,
                              onOpen,
                              onClose,
                              latitude,
                              longitude,
                              onSelect,
                              selectable = false,
                              isDialogIcon = false,
                          }) => {
    const [tempLocation, setTempLocation] = useState(
        latitude && longitude
            ? { lat: latitude, lng: longitude }
            : DEFAULT_LOCATION
    );

    const handleOpen = () => {
        setTempLocation(
            latitude && longitude
                ? { lat: latitude, lng: longitude }
                : DEFAULT_LOCATION
        );
        onOpen?.();
    }

    const handleMapClick = (loc) => {
        if (!selectable) return;
        setTempLocation(loc);
    }

    const handleConfirm = () => {
        if (tempLocation && onSelect) onSelect(tempLocation);
        onClose?.();
    }

    const handleClose = () => {
        setTempLocation(
            latitude && longitude
                ? { lat: latitude, lng: longitude }
                : DEFAULT_LOCATION
        );
        onClose?.();
    }

    return (
        <>
            {isDialogIcon && (
                <div className="dialog__icon">
                    <IconButton onClick={handleOpen}>
                        <MyLocationIcon className="dialog__icon--location" />
                    </IconButton>
                </div>
            )}

            <Dialog
                className="dialog"
                open={open}
                onClose={handleClose}
                disableRestoreFocus
            >
                <div className="dialog__header">
                    <span className="dialog__title">
                        Місцезнаходження автомобіля
                    </span>

                    <IconButton onClick={handleClose}>
                        <CloseIcon className="dialog__icon--close" />
                    </IconButton>
                </div>

                <div className="dialog__map">
                    <MapContainer
                        locations={tempLocation ? [tempLocation] : []}
                        className="map"
                        selectable={selectable}
                        onSelect={handleMapClick}
                        shouldCenter={true}
                    />
                </div>

                {selectable && (
                    <div className="dialog__map--button">
                        <AppButton
                            type="button"
                            label="Підтвердити"
                            onClick={handleConfirm}
                            disabled={!tempLocation}
                        />
                    </div>
                )}
            </Dialog>
        </>
    );
}