import { useActiveTrip, useEntity } from "../hooks";

import { CarService } from "../services";

export const useTripCar = () => {
    const {
        entity: trip,
        loading: tripLoading,
        error: tripError
    } = useActiveTrip();

    const {
        entity: car,
        loading: carLoading,
        error: carError,
        refetch,
    } = useEntity(trip?.carId, CarService.getCarById);

    return {
        entity: car,
        loading: tripLoading || carLoading,
        error: tripError || carError,
        refetch,
    }
}