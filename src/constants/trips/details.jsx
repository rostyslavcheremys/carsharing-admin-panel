import { DetailsLink } from "../../components";

import { getFormattedTimestamp } from "../../utils";

import { ADMIN } from "../../constants";

import { TRIP_STATUS } from "./options.js";

export const TRIP_DETAILS = [
    { label: "ID:", key: "id" },
    {
        label: "Автомобіль:", key: "carId",
        formatter: (id) => (
            <DetailsLink to={ADMIN.carDetails(id)} />
        )
    },
    {
        label: "Користувач:", key: "userId",
        formatter: (id) => (
            <DetailsLink to={ADMIN.userDetails(id)} />
        )
    },
    {
        label: "Бронювання:", key: "bookingId",
        formatter: (id) => (
            <DetailsLink to={ADMIN.bookingDetails(id)} />
        )
    },
    {
        label: "Стан до поїздки:", key: "beforeConditionId",
        formatter: (id) => (
            <DetailsLink to={ADMIN.carConditionDetails(id)} />
        )
    },
    {
        label: "Стан після поїздки:", key: "afterConditionId",
        formatter: (id) => (
            <DetailsLink to={ADMIN.carConditionDetails(id)} />
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