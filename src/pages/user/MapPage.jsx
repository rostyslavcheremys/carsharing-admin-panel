import { useMemo } from "react";

import { Loader, Map } from "../../components";

import { useCollection } from "../../hooks";

import { CarService } from "../../services";

export const MapPage = () => {
    const availableCars = useMemo(
        () => CarService.getAvailableCars(), []
    );

    const {
        data: cars,
        isLoading,
        error,
    } = useCollection(availableCars);

    console.log(cars);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page">
                <Map cars={cars} userMode />
            </div>
        </Loader>
    );
}