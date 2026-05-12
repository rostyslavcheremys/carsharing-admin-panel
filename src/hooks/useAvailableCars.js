import { useMemo } from "react";

export const useAvailableCars = (cars, activeCarId) => {
    return useMemo(() => {
        if (!Array.isArray(cars)) return [];

        return cars.filter(car => {
            if (car.id === activeCarId) return true;

            return car.status !== "unavailable";
        });
    }, [cars, activeCarId]);
}