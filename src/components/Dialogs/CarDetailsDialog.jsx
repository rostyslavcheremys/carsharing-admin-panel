import { useNavigate } from "react-router-dom";

import { CloseIcon } from "../../libs/mui-icons";

import {
    AppDialog,
    ActionIconButton,
    CarImages,
    Details,
    AppButton,
} from "../../components";

import { useAuth, useImages } from "../../hooks";

import {
    CAR_ADMIN_DETAILS, ADMIN,
    CAR_USER_DETAILS, USER,
} from "../../constants";

export const CarDetailsDialog = ({ car, onClose }) => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const images = useImages(car?.images);

    const isAdmin = user?.role === "admin";
    const canBook = user?.role === "user" && car?.status === "available";

    if (!car) return null;

    return (
        <AppDialog open onClose={onClose}>
            <div className="dialog__header">
                <span className="dialog__title">
                    {car?.brand || "Автомобіль"} {car?.model || ""}
                </span>

                <ActionIconButton
                    Icon={CloseIcon}
                    onClick={onClose}
                    iconClassName="dialog__icon"
                />
            </div>

            <div className="dialog__details">
                {images.length > 0 && <CarImages images={images} />}

                <Details
                    data={car}
                    details={isAdmin ? CAR_ADMIN_DETAILS : CAR_USER_DETAILS}
                />
            </div>

            <div className="dialog__button">
                {isAdmin && (
                    <AppButton
                        type="button"
                        label="Редагувати"
                        onClick={() => navigate(ADMIN.carEdit(car.id))}
                        disabled={!car?.id}
                    />
                )}

                {canBook && (
                    <AppButton
                        type="button"
                        label="Забронювати"
                        onClick={() => navigate(USER.bookingDate(car.id))}
                    />
                )}
            </div>
        </AppDialog>
    );
}