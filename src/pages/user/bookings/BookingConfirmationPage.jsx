import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
} from "../../../components";

import { useAuth, useDocument } from "../../../hooks";

import { BOOKING_CONFIRM_DETAILS, USER } from "../../../constants";

export const BookingConfirmationPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const { user } = useAuth();

    const {
        document: booking,
        isLoading,
        error
    } = useDocument("bookings", id);

    const {
        document: car,
        isLoading: carLoading,
        error: carError
    } = useDocument("cars", booking?.carId);

    const bookingConfirmDetails = {
        ...booking,
        car: car ? `${car.brand} ${car.model} • ${car.licensePlate}` : "—",
        fullName: user ? `${user.firstName} ${user.lastName}` : "—"
    }

    return (
        <Loader isLoading={isLoading || carLoading} error={error || carError}>
            <div className="page page__content">
                <span className="page__title">Бронювання підтверджено</span>

                <Details
                    data={bookingConfirmDetails}
                    details={BOOKING_CONFIRM_DETAILS}
                />

                <div className="page__buttons">
                    <AppButton
                        type="button"
                        className="app-button--large"
                        label="Перейти до авто"
                        onClick={() => navigate(USER.MAP)}
                        disabled={isLoading || carLoading}
                    />
                </div>
            </div>
        </Loader>
    );
}