import { useNavigate } from "react-router-dom";

import { Dialog, IconButton } from "../../libs/mui";

import {ArrowBackIcon, CloseIcon} from "../../libs/mui-icons";

import {ActionIconButton, AppButton} from "../index.js";

import { getLabel } from "../../utils";

import { CAR_STATUS } from "../../constants";

export const MapDetailsDialog = ({ car, onClose }) => {
    const navigate = useNavigate();

    if (!car) return null;

    const handleDetails = () => navigate("/cars/" + car.id);

    return (
        <Dialog
            className="dialog"
            open={open}
            onClose={onClose}
            disableRestoreFocus
            disablePortal
        >
            <div className="dialog__header">
                <span className="dialog__title">{car.brand} {car.model}</span>

                <ActionIconButton
                    Icon={CloseIcon}
                    className="dialog__icon--close"
                    onClick={onClose}
                />
            </div>

            <div className="dialog__text--container">
                <span className="dialog__text">
                    Статус: <span className={`status--${car.status}`}>{getLabel(car.status, CAR_STATUS)}</span>
                </span>

                <span className="dialog__text">{`Номерний знак: ${car.licensePlate}`}</span>
            </div>

            <div className="dialog__map--button">
                <AppButton
                    type="button"
                    label="Детальніше"
                    onClick={handleDetails}
                />
            </div>
        </Dialog>
    );
};
