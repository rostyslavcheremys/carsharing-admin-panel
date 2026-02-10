import { useMemo, useState } from "react";

import { Dialog, IconButton } from "../../libs/mui";

import { MyLocationIcon, CloseIcon } from "../../libs/mui-icons";

import { MapContainer, AppButton } from "../../components";

import { DEFAULT_LOCATION } from "../../constants";

export const MapDialog = ({
                              open,
                              onOpen,
                              onClose,
                              latitude,
                              longitude,
                              status,
                              onSelect,
                              selectable = false,
                              isDialogIcon = false,
                              mapDialog,
                          }) => {
    const initialLocation = useMemo(() => ({
        lat: latitude ?? DEFAULT_LOCATION.lat,
        lng: longitude ?? DEFAULT_LOCATION.lng,
    }), [latitude, longitude]);

    const [tempLocation, setTempLocation] = useState(initialLocation);

    const handleOpen = () => {
        setTempLocation(initialLocation);
        onOpen?.();
    }

    const handleMapClick = (loc) => {
        if (!selectable) return;
        setTempLocation({ ...loc });
    }

    const handleConfirm = () => {
        onSelect?.(tempLocation);
        onClose?.();
    }

    const handleClose = () => onClose?.();

    const locationWithStatus = useMemo(() => {
        return selectable
            ? [{ ...tempLocation }]
            : [{ ...initialLocation, status }]
    }, [selectable, tempLocation, initialLocation, status]);

    return (
        <>
            {isDialogIcon && (
                <div className="dialog__icon">
                    <IconButton onClick={handleOpen}>
                        <MyLocationIcon className="dialog__icon--location" />
                    </IconButton>
                </div>
            )}

            <Dialog open={open} onClose={handleClose} disableRestoreFocus>
                <div className="dialog__header">
                    <span className="dialog__title">Місцезнаходження автомобіля</span>

                    <IconButton onClick={handleClose}>
                        <CloseIcon className="dialog__icon--close" />
                    </IconButton>
                </div>

                <div className="dialog__map">
                    <MapContainer
                        locations={locationWithStatus}
                        className="map"
                        selectable={selectable}
                        onSelect={handleMapClick}
                        shouldCenter
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