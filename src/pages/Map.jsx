import {useMemo, useState} from "react";

import { Loader, AppButtonGroup, MapContainer } from "../components";

import { useCollection } from "../hooks";

import { getNumber } from "../utils";

import { CAR_STATUS_FILTER } from "../constants";

export const Map = () => {
    const {
        data: cars,
        isLoading,
        /*error,*/
    } = useCollection("cars");

    const [statusFilter, setStatusFilter] = useState([]);

    const mapCars = useMemo(() => {
        if (!cars) return [];

        return cars
            .filter(car =>
                car.location?._lat != null &&
                car.location?._long != null
            ).map(car => ({
                id: car.id,
                status: car.status,
                brand: car.brand,
                model: car.model,
                licensePlate: car.licensePlate,
                lat: getNumber(car.location._lat),
                lng: getNumber(car.location._long)
            })).filter(car =>
                Number.isFinite(car.lat) &&
                Number.isFinite(car.lng) &&
                (statusFilter.length === 0 || statusFilter.includes(car.status))
            );
    }, [cars, statusFilter]);

    return (
        <Loader isLoading={isLoading}>
            <div className="page">
                <span className="page__title">Моніторинг автомобілів</span>

                <div className="page__filters">
                    <AppButtonGroup
                        buttons={CAR_STATUS_FILTER}
                        selected={statusFilter}
                        onClick={setStatusFilter}
                    />
                </div>

                <div className="page__map">
                    <MapContainer
                        locations={mapCars}
                        className="map page"
                        mapCard={true}
                    />
                </div>
            </div>
        </Loader>
    );
}