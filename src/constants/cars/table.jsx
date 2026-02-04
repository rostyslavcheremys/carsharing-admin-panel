import {
    DialogCell,
    MapDialog,
    ImageDialog,
} from "../../components";

import { getLabel, getString } from "../../utils";

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
    { id: "actions", label: "Дії" },
    { id: "id", label: "ID" },
    {
        id: "status", label: "Статус",
        render: (car) => getLabel(car?.status, STATUS)
    },
    {
        id: "location", label: "Місцезнаходження",
        render: (car) => (
            <DialogCell>
                {({ open, onOpen, onClose }) => (
                    <MapDialog
                        open={open}
                        onOpen={onOpen}
                        onClose={onClose}
                        latitude={car?.location?.latitude}
                        longitude={car?.location?.longitude}
                        isDialogIcon={true}
                    />
                )}
            </DialogCell>
        )
    },
    {
        id: "images", label: "Фотографії",
        render: (car) => (
            <DialogCell>
                {({ open, onOpen, onClose }) => (
                    <ImageDialog
                        open={open}
                        onOpen={onOpen}
                        onClose={onClose}
                        images={car?.images}
                    />
                )}
            </DialogCell>
        )
    },
    { id: "brand", label: "Марка" },
    { id: "model", label: "Модель" },
    { id: "year", label: "Рік випуску" },
    {
        id: "mileage", label: "Пробіг",
        render: (car) => getString(car?.mileage, "км")
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
        id: "fuelType", label: "Тип палива",
        render: (car) => getLabel(getString(car?.engine?.fuelType), FUEL_TYPES)
    },
    {
        id: "displacement", label: "Об'єм двигуна",
        render: (car) => getString(car?.engine?.displacement, "л")
    },
    {
        id: "capacity", label: "Ємність батареї",
        render: (car) => getString(car?.battery?.capacity, "кВт·год")
    },
    {
        id: "range", label: "Запас ходу",
        render: (car) => getString(car?.battery?.range, "км")
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
        render: (car) => getString(car?.pricePerDay, "грн")
    },
    { id: "rating", label: "Рейтинг" },
];