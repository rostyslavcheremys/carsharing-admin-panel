import { useMemo, useState } from "react";

import { Dialog } from "../../libs/mui";

import { MyLocationIcon, CloseIcon} from "../../libs/mui-icons";

import { ActionIconButton, MapPicker, AppButton } from "../../components";

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
                <div className="dialog__icon">
                    <ActionIconButton
                        Icon={MyLocationIcon}
                        onClick={handleOpen}
                        iconClassName={"dialog__icon--location"}
                    />
                </div>
            )}

            <Dialog
                className="dialog"
                open={open}
                onClose={onClose}
                disableEnforceFocus={true}
                disableRestoreFocus={true}
                disablePortal={false}
            >
                <div className="dialog__header">
                    <span className="dialog__title">Місцезнаходження автомобіля</span>

                    <ActionIconButton
                        Icon={CloseIcon}
                        onClick={onClose}
                        iconClassName={"dialog__icon--close"}
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