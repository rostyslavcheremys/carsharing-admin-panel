import { useMemo } from "react";

export const useAvailableCars = (cars, activeCarId) => {
    return useMemo(() => {
        if (!Array.isArray(cars)) return [];

        return cars.filter(car =>
            car.status === "available" || car.id === activeCarId
        );
    }, [cars, activeCarId]);
};