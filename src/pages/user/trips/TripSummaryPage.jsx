import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton
} from "../../../components";

import { useDocument, useAuth } from "../../../hooks";

import {
    getCarName,
    getFullName,
    getTripDuration
} from "../../../utils";

import { TRIP_SUMMARY_DETAILS, USER } from "../../../constants";

export const TripSummaryPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: trip,
        loading: tripLoading,
        error: tripError,
    } = useDocument("trips", id);

    const {
        document: car,
        loading: carLoading,
        error: carError,
    } = useDocument("cars", trip?.carId);

    const {
        user,
        loading: userLoading,
        error: userError,
    } = useAuth();

    return (
        <Loader
            isLoading={tripLoading || carLoading || userLoading}
            error={tripError || carError || userError}
        >
            <div className="page page__content">
                <span className="page__title">Поїздка завершена</span>

                <Details
                    data={{
                        ...trip,
                        car: getCarName(car),
                        fullName: getFullName(user),
                        duration: getTripDuration(trip?.actualStart, trip?.actualEnd),
                    }}
                    details={TRIP_SUMMARY_DETAILS}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="На головну"
                        onClick={() => navigate(USER.HOME)}
                        disabled={tripLoading || carLoading || userLoading}
                    />
                </div>
            </div>
        </Loader>
    );
}