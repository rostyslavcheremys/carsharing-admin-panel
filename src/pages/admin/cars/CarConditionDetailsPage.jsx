import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    Details,
    AppButton,
} from "../../../components";

import { useDocument } from "../../../hooks";

import { CAR_CONDITION_DETAILS } from "../../../constants";

export const CarConditionDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: carCondition, isLoading, error
    } = useDocument("carCondition", id);

    const images = useMemo(() => {
        if (!carCondition?.images) return [];
        return Array.isArray(carCondition.images) ? carCondition.images : [carCondition.images];
    }, [carCondition]);

    return(
        <Loader isLoading={isLoading || !carCondition} error={error}>
            <div className="page page__content">
                <span className="page__title">Стан автомобіля</span>

                {images.length > 0 && <CarImages images={images} />}

                <Details data={carCondition} details={CAR_CONDITION_DETAILS} />

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