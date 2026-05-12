import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    Details,
    AppButton,
} from "../../../components";

import { useDocument, useImages } from "../../../hooks";

import { TRIP_CONDITION_DETAILS } from "../../../constants";

import { getCarName } from "../../../utils";

export const TripConditionDetailsPage = () => {
    const navigate = useNavigate();

    const { conditionId } = useParams();

    const {
        document: carCondition,
        isLoadingCarCondition,
        errorCarCondition
    } = useDocument("carConditions", conditionId);

    const {
        document: car,
        isLoadingCar,
        errorCar
    } = useDocument("cars", carCondition?.carId);

    const conditionImages = useImages(carCondition?.images);

    return(
        <Loader
            isLoading={isLoadingCarCondition || isLoadingCar || !carCondition}
            error={errorCarCondition || errorCar}
        >
            <div className="page page__content">
                <span className="page__title">Стан автомобіля</span>

                {conditionImages.length > 0 && <CarImages images={conditionImages} />}

                <Details
                    data={{
                        ...carCondition,
                        car: getCarName(car)
                    }}
                    details={TRIP_CONDITION_DETAILS}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoadingCarCondition || isLoadingCar || !carCondition}
                    />
                </div>
            </div>
        </Loader>
    );
}