import { useMemo } from "react";

import { Loader, MapContainer } from "../components";

import { useCollection } from "../hooks";

import { getNumber } from "../utils";

export const Map = () => {
    const {
        data: cars,
        isLoading,
        /*error,*/
    } = useCollection("cars");

    const mapCars = useMemo(() => {
        if (!cars) return [];

        return cars
            .filter(car =>
                car.location?._lat != null &&
                car.location?._long != null
            ).map(car => ({
                id: car.id,
                status: car.status,
                lat: getNumber(car.location._lat),
                lng: getNumber(car.location._long)
            })).filter(car =>
                Number.isFinite(car.lat) &&
                Number.isFinite(car.lng)
            );
    }, [cars]);

    return (
        <Loader isLoading={isLoading}>
            <div className="page">
                <span className="page__title">Моніторинг автомобілів</span>

                <div className="page__map">
                    <MapContainer
                        locations={mapCars}
                        className="map page"
                    />
                </div>
            </div>
        </Loader>
    );
}