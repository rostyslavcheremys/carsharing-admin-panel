import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    Details,
    DetailsMap,
    AppButton,
    MessageDialog,
} from "../../../components";

import { useMessageDialog, useDocument } from "../../../hooks";

import { getTripLocation } from "../../../utils";

import { CAR_DETAILS } from "../../../constants";

export const CarDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: car, isLoading, error
    } = useDocument("cars", id, showMessage, navigate);

    const images = useMemo(() => {
        if (!car?.images) return [];
        return Array.isArray(car.images) ? car.images : [car.images];
    }, [car]);

    const location = getTripLocation(car, "location");

    if (!car) return null;

    return(
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Автомобіль</span>

                {images.length > 0 && <CarImages images={images} />}

                <Details data={car} details={CAR_DETAILS} />

                <DetailsMap
                    label="Місцезнаходження"
                    location={location}
                    status={car.status}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoading || messageOpen}
                    />
                </div>

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}