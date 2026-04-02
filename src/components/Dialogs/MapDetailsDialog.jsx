import { useNavigate } from "react-router-dom";

import { Dialog } from "../../libs/mui";

import { CloseIcon} from "../../libs/mui-icons";

import { ActionIconButton, AppButton } from "../../components";

import { getLabel } from "../../utils";

import { ADMIN, CAR_STATUS } from "../../constants";

export const MapDetailsDialog = ({ car, onClose }) => {
    const navigate = useNavigate();

    if (!car) return null;

    const handleDetails = () => {
        if (car?.id) navigate(ADMIN.carDetails(car.id));
    }

    return (
        <Dialog
            className="dialog"
            open
            onClose={onClose}
            disableEnforceFocus
            disableRestoreFocus
            disablePortal={false}
        >
            <div className="dialog__header">
                <span className="dialog__title">{car?.brand || "Автомобіль"} {car?.model || ""}</span>

                <ActionIconButton
                    Icon={CloseIcon}
                    onClick={onClose}
                    iconClassName="dialog__icon--close"
                />
            </div>

            <div className="dialog__text--container">
                <span className="dialog__text">
                    Статус: <span className={`status--${car?.status}`}>
                        {getLabel(car?.status, CAR_STATUS) || "Невідомо"}
                    </span>
                </span>

                <span className="dialog__text">
                    {`Номерний знак: ${car?.licensePlate || "Невідомо"}`}
                </span>
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
}