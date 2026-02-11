import { useMemo } from "react";

import { getNumber } from "../../utils";

export const useFilteredCars = (cars, statusFilter) =>
    useMemo(() => {
        return cars
            .filter(car => car.location?._lat != null)
            .filter(car => !statusFilter.length || statusFilter.includes(car.status))
            .map(car => ({
                ...car,
                lat: getNumber(car.location._lat),
                lng: getNumber(car.location._long),
            }));
    }, [cars, statusFilter]);