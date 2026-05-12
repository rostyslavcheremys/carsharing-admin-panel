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
    useImages, useActiveTrip
} from "../../hooks";

import {
    CAR_ADMIN_DETAILS, ADMIN,
    CAR_USER_DETAILS, USER,
} from "../../constants";

export const CarDetailsDialog = ({ car, activeCarId, onClose }) => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const { entity: booking } = useActiveBooking();

    const { entity: trip } = useActiveTrip();

    const images = useImages(car?.images);

    const isAdmin = user?.role === "admin";
    const canBook = user?.role === "user";

    const isMyCar = car?.id === activeCarId;
    const hasActiveTrip = !!trip?.id;

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
                            onClick={() => navigate(ADMIN.carEdit(car?.id))}
                            disabled={!car?.id}
                        />
                    )}

                    {isMyCar && !hasActiveTrip && (
                        <AppButton
                            type="button"
                            label="Почати поїздку"
                            className="app-button--size-md"
                            onClick={() => navigate(USER.tripStart(booking?.id))}
                            disabled={!booking?.id}
                        />
                    )}

                    {isMyCar && hasActiveTrip && (
                        <AppButton
                            type="button"
                            label="Активна поїздка"
                            className="app-button--size-md"
                            onClick={() => navigate(USER.tripActive(trip?.id))}
                            disabled={!trip?.id}
                        />
                    )}

                    {!isMyCar && canBook && (
                        <AppButton
                            type="button"
                            label="Забронювати"
                            onClick={() => navigate(USER.bookingPeriod(car?.id))}
                            disabled={!car?.id}
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