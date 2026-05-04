import { useNavigate } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
} from "../../../components";

import  {
    useActiveBooking,
    useBookingCar,
    useAuth
} from "../../../hooks";

import { getCarName, getFullName } from "../../../utils";

import { BOOKING_CONFIRM_DETAILS, USER } from "../../../constants";

export const BookingConfirmationPage = () => {
    const navigate = useNavigate();

    const {
        entity: booking,
        loading: bookingLoading,
        error: bookingError,
    } = useActiveBooking();

    const {
        entity: car,
        loading: carLoading,
        error: carError,
    } = useBookingCar();

    const {
        user,
        loading: userLoading,
        error: userError,
    } = useAuth();

    return (
        <Loader
            isLoading={bookingLoading || carLoading || userLoading}
            error={bookingError || carError || userError}
        >
            <div className="page page__content">
                <span className="page__title">Бронювання підтверджено</span>

                <Details
                    data={{
                        ...booking,
                        car: getCarName(car),
                        fullName: getFullName(user),
                    }}
                    details={BOOKING_CONFIRM_DETAILS}
                />

                <div className="page__buttons page__buttons--column">
                    <AppButton
                        type="button"
                        label="Почати поїздку"
                        className="app-button--size-md"
                        onClick={() => navigate(USER.tripStart(booking?.id))}
                        disabled={bookingLoading || carLoading || userLoading}
                    />

                    <AppButton
                        type="button"
                        label="Карта"
                        onClick={() => navigate(USER.MAP)}
                        disabled={bookingLoading || carLoading || userLoading}
                    />
                </div>
            </div>
        </Loader>
    );
}