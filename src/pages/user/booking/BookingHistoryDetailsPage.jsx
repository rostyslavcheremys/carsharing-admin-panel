import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
} from "../../../components";

import { useDocument } from "../../../hooks";

import { BOOKING_HISTORY_DETAILS } from "../../../constants";

import { getCarName } from "../../../utils";

export const BookingHistoryDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: booking,
        isLoadingBooking,
        errorBooking
    } = useDocument("bookings", id);

    const {
        document: car,
        isLoadingCar,
        errorCar
    } = useDocument("cars", booking?.carId);

    return (
        <Loader
            isLoading={isLoadingBooking || isLoadingCar}
            error={errorBooking || errorCar}
        >
            <div className="page page__content">
                <span className="page__title">Бронювання</span>

                <Details
                    data={{
                        ...booking,
                        car: getCarName(car),
                    }}
                    details={BOOKING_HISTORY_DETAILS}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoadingBooking || isLoadingCar}
                    />
                </div>
            </div>
        </Loader>
    );
}