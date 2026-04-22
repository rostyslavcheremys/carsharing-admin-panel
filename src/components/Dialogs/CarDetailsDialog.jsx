import { useNavigate } from "react-router-dom";

import { CloseIcon } from "../../libs/mui-icons";

import {
    AppDialog,
    ActionIconButton,
    CarImages,
    Details,
    AppButton,
} from "../../components";

import {
    useAuth,
    useActiveBooking,
    useImages
} from "../../hooks";

import {
    CAR_ADMIN_DETAILS, ADMIN,
    CAR_USER_DETAILS, USER,
} from "../../constants";

export const CarDetailsDialog = ({ car, activeCarId, onClose }) => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const { activeBookingId } = useActiveBooking();

    const images = useImages(car?.images);

    const isAdmin = user?.role === "admin";
    const canBook = user?.role === "user" && car?.status === "available";

    const isMyCar = car?.id === activeCarId;

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

                <div className="dialog__buttons">
                    {isAdmin && (
                        <AppButton
                            type="button"
                            label="Редагувати"
                            onClick={() => navigate(ADMIN.carEdit(car.id))}
                            disabled={!car?.id}
                        />
                    )}

                    {isMyCar && (
                        <AppButton
                            type="button"
                            label="Розпочати поїздку"
                            className="app-button--size-md"
                            onClick={() => navigate(USER.tripStart(activeBookingId))}
                        />
                    )}

                    {!isMyCar && canBook && (
                        <AppButton
                            type="button"
                            label="Забронювати"
                            onClick={() => navigate(USER.bookingPeriod(car.id))}
                        />
                    )}
                </div>

                <Details
                    data={car}
                    details={isAdmin ? CAR_ADMIN_DETAILS : CAR_USER_DETAILS}
                />
            </div>
        </AppDialog>
    );
}