import { MapDialog, ImageDialog } from "../../components";

import { getLabel, getStringOrEmpty } from "../../utils";

import {
    BODY_TYPES,
    COLORS,
    DRIVE_TYPES,
    FUEL_TYPES,
    POWERTRAIN_TYPES,
    STATUS,
    TRANSMISSION_TYPES,
} from "./options.js";

export const CARS_TABLE_COLUMNS = [
    { id: "id", label: "ID" },
    {
        id: "status", label: "Статус",
        render: (car) => getLabel(car?.status, STATUS)
    },
    {
        id: "location", label: "Місцезнаходження",
        render: (car) =>
            <MapDialog
                latitude={car?.location?.latitude}
                longitude={car?.location?.longitude}
            />
    },
    {
        id: "images", label: "Фотографії",
        render: (car) => <ImageDialog images={car?.images} />
    },
    { id: "brand", label: "Марка" },
    { id: "model", label: "Модель" },
    { id: "year", label: "Рік випуску" },
    {
        id: "mileage", label: "Пробіг",
        render: (car) => getStringOrEmpty(car?.mileage, "км")
    },
    { id: "licensePlate", label: "Номерний знак" },
    {
        id: "bodyType", label: "Тип кузова",
        render: (car) => getLabel(car?.bodyType, BODY_TYPES)
    },
    {
        id: "powertrainType", label: "Тип двигуна",
        render: (car) => getLabel(car?.powertrainType, POWERTRAIN_TYPES)
    },
    {
        id: "displacement", label: "Об'єм двигуна",
        render: (car) => getStringOrEmpty(car?.engine?.displacement, "л")
    },
    {
        id: "fuelType", label: "Тип палива",
        render: (car) => getLabel(getStringOrEmpty(car?.engine?.fuelType), FUEL_TYPES)
    },
    {
        id: "capacity", label: "Ємність батареї",
        render: (car) => getStringOrEmpty(car?.battery?.capacity, "кВт·год")
    },
    {
        id: "range", label: "Запас ходу",
        render: (car) => getStringOrEmpty(car?.battery?.range, "км")
    },
    {
        id: "transmissionType", label: "Коробка передач",
        render: (car) => getLabel(car?.transmissionType, TRANSMISSION_TYPES)
    },
    {
        id: "driveType", label: "Привід",
        render: (car) => getLabel(car?.driveType, DRIVE_TYPES)
    },
    {
        id: "color", label: "Колір",
        render: (car) => getLabel(car?.color, COLORS)
    },
    { id: "seats", label: "Кількість місць" },
    {
        id: "pricePerDay", label: "Вартість за добу",
        render: (car) => getStringOrEmpty(car?.pricePerDay, "грн")
    },
    { id: "rating", label: "Рейтинг" },
];