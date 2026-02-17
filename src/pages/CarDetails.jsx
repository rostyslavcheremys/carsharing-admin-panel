import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    CarSpecs,
    MapPicker,
    AppButton,
    MessageDialog
} from "../components/index.js";

import { useMessageDialog } from "../hooks";

import { getErrorMessage } from "../utils";

import { getCarById } from "../services";

export const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isFetching, setIsFetching] = useState(true);
    const [car, setCar] = useState([]);

    const images = Array.isArray(car.images) ? car.images : [car.images];

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    useEffect(() => {
        const loadCar = async () => {
            if (!id) return;

            try {
                setIsFetching(true);

                const car = await getCarById(id);

                setCar(car);
            } catch (error) {
                showMessage(
                    getErrorMessage(error),
                    () => navigate("/cars")
                );
            } finally {
                setIsFetching(false);
            }
        }

        loadCar();
    }, []);

    return(
        <Loader isLoading={isFetching} /*error={error}*/>
            <div className="page page__content">
                <span className="page__title">Автомобіль</span>

                {images.length > 0 &&
                    <CarImages images={images}/>
                }

                <CarSpecs car={car}/>

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
                        disabled={isFetching}
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