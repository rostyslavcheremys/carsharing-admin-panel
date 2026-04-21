import { useMemo } from "react";

import { getNumber, getNestedValue } from "../../utils";

import { MAP_FILTERS } from "../../constants";

const isValidValue = (value) => value != null && value !== "";

const checkCheckboxFilter = (carValue, filterValue) => {
    if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
    if (!isValidValue(carValue)) return true;

    return filterValue.includes(carValue);
};

const checkRangeFilter = (carValue, filterValue) => {
    if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
    if (!isValidValue(carValue)) return true;

    const [min, max] = filterValue;

    return carValue >= min && carValue <= max;
};

export const useFilteredCars = (cars = [], filters = {}) =>
    useMemo(() => {
        return cars
            .filter(car => car.location?._lat != null && car.location?._long != null)
            .filter(car =>
                MAP_FILTERS.every(filter => {
                    const filterValue = filters[filter.key];
                    if (filterValue == null) return true;

                    const carValue = getNestedValue(car, filter.field ?? filter.key);

                    if (filter.type === "checkbox") return checkCheckboxFilter(carValue, filterValue);
                    if (filter.type === "range") return checkRangeFilter(carValue, filterValue);

                    return true;
                })
            )
            .map(car => ({
                ...car,
                lat: getNumber(car.location._lat),
                lng: getNumber(car.location._long),
            }));
    }, [cars, filters]);