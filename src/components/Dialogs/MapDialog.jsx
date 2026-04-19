import { useMemo, useState } from "react";

import { MyLocationIcon, CloseIcon} from "../../libs/mui-icons";

import {
    AppDialog,
    ActionIconButton,
    MapPicker,
    AppButton
} from "../../components";

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

    return (
        <>
            {isDialogIcon && (
                <div className="dialog__icon--container">
                    <ActionIconButton
                        Icon={MyLocationIcon}
                        onClick={handleOpen}
                        iconClassName={"dialog__icon"}
                    />
                </div>
            )}

            <AppDialog open={open} onClose={onClose}>
                <div className="dialog__header">
                    <span className="dialog__title">Місцезнаходження</span>

                    <ActionIconButton
                        Icon={CloseIcon}
                        onClick={onClose}
                        iconClassName={"dialog__icon"}
                    />
                </div>

                <div className="dialog__map">
                    <MapPicker
                        location={selectable ? tempLocation : initialLocation}
                        status={status}
                        selectable={selectable}
                        onSelect={handleMapClick}
                    />
                </div>

                {selectable && (
                    <div className="dialog__button map-dialog__button">
                        <AppButton
                            type="button"
                            label="Підтвердити"
                            onClick={handleConfirm}
                            disabled={!tempLocation}
                        />
                    </div>
                )}
            </AppDialog>
        </>
    );
}