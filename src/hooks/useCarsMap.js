import { useMemo } from "react";
import { useCollection } from "./useCollection";

export const useCarsMap = () => {
    const {
        data: cars,
        isLoading,
        error
    } = useCollection("cars");

    const carsMap = useMemo(() => {
        if (!cars) return {};

        return cars.reduce((acc, car) => {
            acc[car.id] = car;
            return acc;
        }, {});
    }, [cars]);

    return {
        cars,
        carsMap,
        isLoading,
        error
    }
}