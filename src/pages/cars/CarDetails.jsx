import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    Details,
    MapPicker,
    AppButton,
    MessageDialog
} from "../../components/index.js";

import { useMessageDialog, useDocument } from "../../hooks/index.js";

import { CAR_DETAILS } from "../../constants/index.js";

export const CarDetails = () => {
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

    if (!car) return null;

    return(
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Автомобіль</span>

                {images.length > 0 && <CarImages images={images} />}

                <Details data={car} details={CAR_DETAILS} />

                <div className="car-details__map">
                    <MapPicker
                        className="map car-details__map-picker"
                        location={
                            car.location?._lat && car.location?._long
                                ? {
                                    lat: Number(car.location._lat),
                                    lng: Number(car.location._long),
                                }
                                : null
                        }
                        status={car.status}
                    />
                </div>

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoading}
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