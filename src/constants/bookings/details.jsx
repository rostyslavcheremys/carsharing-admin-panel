import { DetailsLink } from "../../components";

import { getFormattedTimestamp } from "../../utils";

import { ADMIN } from "../../constants";

import { BOOKING_STATUS } from "./options.js";

export const BOOKING_DETAILS = [
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