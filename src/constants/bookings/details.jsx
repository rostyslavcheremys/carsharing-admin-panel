import { Link } from "react-router-dom";

import { DetailsLink } from "../../components";

import { getFormattedTimestamp } from "../../utils";

import { BOOKING_STATUS } from "./options.js";

export const BOOKING_DETAILS = [
    { label: "ID:", key: "id" },
    {
        label: "Автомобіль:", key: "carId",
        formatter: (id) => (
            <DetailsLink to={`/cars/${id}`} />
        )
    },
    {
        label: "Користувач:", key: "userId",
        formatter: (id) => (
            <DetailsLink to={`/users/${id}`} />
        )
    },
    { label: "Статус:", key: "status", map: BOOKING_STATUS },
    {
        label: "Запланований початок:", key: "plannedStart",
        formatter: (booking) => getFormattedTimestamp(booking)
    },
    {
        label: "Заплановане завершення:", key: "plannedEnd",
        formatter: (booking) => getFormattedTimestamp(booking)
    },
    {
        label: "Дата створення:", key: "createdAt",
        formatter: (booking) => getFormattedTimestamp(booking, true)
    },
];