import { DetailsLink } from "../../components";

import { formatDateTime } from "../../utils";

import { ADMIN } from "../../constants";

import { TRIP_STATUS } from "./options.js";

export const TRIP_DETAILS = [
    { label: "ID:", key: "id" },
    { label: "Статус:", key: "status", map: TRIP_STATUS },
    { label: "Вартість:", key: "price", suffix: "грн" },
    { label: "Доплата:", key: "additionalCharge", suffix: "грн" },
    { label: "Загальна вартість:", key: "totalPrice", suffix: "грн" },
    {
        label: "Автомобіль:", key: "carId",
        formatter: (id) => <DetailsLink to={ADMIN.carDetails(id)} />
    },
    {
        label: "Користувач:", key: "userId",
        formatter: (id) => <DetailsLink to={ADMIN.userDetails(id)} />
    },
    {
        label: "Бронювання:", key: "bookingId",
        formatter: (id) => <DetailsLink to={ADMIN.bookingDetails(id)} />
    },
    {
        label: "Стан перед поїздкою:", key: "conditionStartId",
        formatter: (id) => <DetailsLink to={ADMIN.carConditionDetails(id)} />
    },
    {
        label: "Стан після поїздки:", key: "conditionEndId",
        formatter: (id) => <DetailsLink to={ADMIN.carConditionDetails(id)} />
    },
    {
        label: "Початок:", key: "actualStart",
        formatter: (trip) => formatDateTime(trip, true)
    },

    {
        label: "Завершення:", key: "actualEnd",
        formatter: (trip) => formatDateTime(trip, true)
    },
];

export const TRIP_PAYMENT_DETAILS = [
    { label: "До сплати:", key: "additionalCharge", suffix: "грн" },
];

export const TRIP_SUMMARY_DETAILS = [
    { label: "Автомобіль:", key: "car" },
    { label: "Ім'я та прізвище:", key: "fullName" },
    { label: "Тривалість:", key: "duration" },
    { label: "Загальна вартість:", key: "totalPrice", suffix: "грн" },
];