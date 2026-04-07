import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    Details,
    DetailsMap,
    AppButton,
} from "../../../components";

import { useDocument, useImages } from "../../../hooks";

import { getTripLocation } from "../../../utils";

import { CAR_ADMIN_DETAILS, ADMIN } from "../../../constants";

export const CarDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: car, isLoading, error
    } = useDocument("cars", id);

    const images = useImages(car?.images);

    const location = getTripLocation(car, "location");

    return(
        <Loader isLoading={isLoading || !car} error={error}>
            <div className="page page__content">
                <span className="page__title">Автомобіль</span>

                {images.length > 0 && <CarImages images={images} />}

                <Details data={car} details={CAR_ADMIN_DETAILS} />

                <DetailsMap
                    label="Місцезнаходження"
                    location={location}
                    status={car?.status}
                />

                <div className="page__buttons">
                    <AppButton
                        type="button"
                        label="Редагувати"
                        onClick={() => navigate(ADMIN.carEdit(car.id))}
                        disabled={isLoading || !car?.id}
                    />

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