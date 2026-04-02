import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    Details,
    DetailsMap,
    AppButton,
} from "../../../components";

import { useDocument } from "../../../hooks";

import { getTripLocation } from "../../../utils";

import { CAR_DETAILS } from "../../../constants";

export const CarDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: car, isLoading, error
    } = useDocument("cars", id);

    const images = useMemo(() => {
        if (!car?.images) return [];
        return Array.isArray(car.images) ? car.images : [car.images];
    }, [car]);

    const location = useMemo(() => getTripLocation(car, "location"), [car]);

    return(
        <Loader isLoading={isLoading || !car} error={error}>
            <div className="page page__content">
                <span className="page__title">Автомобіль</span>

                {images.length > 0 && <CarImages images={images} />}

                <Details data={car} details={CAR_DETAILS} />

                <DetailsMap
                    label="Місцезнаходження"
                    location={location}
                    status={car?.status}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </Loader>
    );
}