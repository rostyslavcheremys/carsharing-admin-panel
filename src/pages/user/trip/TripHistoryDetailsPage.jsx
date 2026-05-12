import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
} from "../../../components";

import { useDocument } from "../../../hooks";

import { TRIP_HISTORY_DETAILS } from "../../../constants";

import { getCarName } from "../../../utils";

export const TripHistoryDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: trip,
        isLoadingTrip,
        errorTrip
    } = useDocument("trips", id);

    const {
        document: car,
        isLoadingCar,
        errorCar
    } = useDocument("cars", trip?.carId);

    return (
        <Loader
            isLoading={isLoadingTrip || isLoadingCar}
            error={errorTrip || errorCar}
        >
            <div className="page page__content">
                <span className="page__title">Поїздка</span>

                <Details
                    data={{
                        ...trip,
                        car: getCarName(car),
                    }}
                    details={TRIP_HISTORY_DETAILS}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoadingTrip || isLoadingCar}
                    />
                </div>
            </div>
        </Loader>
    );
}