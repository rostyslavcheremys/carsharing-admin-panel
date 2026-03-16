import { DetailsLink } from "../../components";

import { getFormattedTimestamp } from "../../utils";

import { TRIP_STATUS } from "./options.js";

export const TRIP_DETAILS = [
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
    {
        label: "Бронювання:", key: "bookingId",
        formatter: (id) => (
            <DetailsLink to={`/bookings/${id}`} />
        )
    },
    {
        label: "Стан до поїздки:", key: "stateBeforeId",
        formatter: (id) => (
            <DetailsLink to={`/car-state/${id}`} />
        )
    },
    {
        label: "Стан після поїздки:", key: "stateAfterId",
        formatter: (id) => (
            <DetailsLink to={`/car-state/${id}`} />
        )
    },
    { label: "Статус:", key: "status", map: TRIP_STATUS },
    { label: "Загальна вартість:", key: "totalPrice" },
    {
        label: "Фактичний початок:", key: "actualStart",
        formatter: (trip) => getFormattedTimestamp(trip, true)
    },

    {
        label: "Фактичне завершення:", key: "actualEnd",
        formatter: (trip) => getFormattedTimestamp(trip, true)
    },
];