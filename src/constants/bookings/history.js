import {
    getString,
    formatDateTime,
    getLabel,
    getCarName
} from "../../utils";

import { BOOKING_STATUS } from "./options.js";

export const BOOKING_HISTORY_TABLE_COLUMNS = (carsMap) => [
    { id: "actions", label: "Дії" },
    {
        id: "carId", label: "Автомобіль",
        render: (booking) => getCarName(carsMap?.[booking?.carId])
    },
    {
        id: "status", label: "Статус",
        render: (booking) => getLabel(booking?.status, BOOKING_STATUS)
    },
    {
        id: "price", label: "Вартість",
        render: (booking) => getString(booking?.price, "грн")
    },
    {
        id: "plannedStart", label: "Запланований початок",
        render: (booking) => formatDateTime(booking?.plannedStart, true)
    },
    {
        id: "plannedEnd", label: "Заплановане завершення",
        render: (booking) => formatDateTime(booking?.plannedEnd, true)
    },
    {
        id: "createdAt", label: "Дата створення",
        render: (booking) => formatDateTime(booking?.createdAt, true)
    }
];