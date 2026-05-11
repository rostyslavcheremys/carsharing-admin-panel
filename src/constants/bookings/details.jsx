import { DetailsLink } from "../../components";

import { formatDateTime } from "../../utils";

import { ADMIN } from "../../constants";

import { BOOKING_STATUS } from "./options.js";

export const BOOKING_DETAILS = [
    { label: "ID:", key: "id" },
    { label: "Статус:", key: "status", map: BOOKING_STATUS },
    { label: "Вартість:", key: "price", suffix: "грн" },
    {
        label: "Автомобіль:", key: "carId",
        formatter: (id) => <DetailsLink to={ADMIN.carDetails(id)} />
    },
    {
        label: "Користувач:", key: "userId",
        formatter: (id) => <DetailsLink to={ADMIN.userDetails(id)} />
    },
    {
        label: "Запланований початок:", key: "plannedStart",
        formatter: (booking) => formatDateTime(booking)
    },
    {
        label: "Заплановане завершення:", key: "plannedEnd",
        formatter: (booking) => formatDateTime(booking)
    },
    {
        label: "Дедлайн оплати:", key: "expiresAt",
        formatter: (booking) => formatDateTime(booking, true)
    },
    {
        label: "Дата створення:", key: "createdAt",
        formatter: (booking) => formatDateTime(booking, true)
    },
];

export const BOOKING_HISTORY_DETAILS = [
    { label: "Автомобіль:", key: "car" },
    { label: "Статус:", key: "status", map: BOOKING_STATUS },
    { label: "Вартість:", key: "price", suffix: "грн" },
    {
        label: "Запланований початок:", key: "plannedStart",
        formatter: (booking) => formatDateTime(booking)
    },
    {
        label: "Заплановане завершення:", key: "plannedEnd",
        formatter: (booking) => formatDateTime(booking)
    },
    {
        label: "Дата створення:", key: "createdAt",
        formatter: (booking) => formatDateTime(booking, true)
    },
];

export const BOOKING_PERIOD_DETAILS = [
    { label: "Кількість днів:", key: "days" },
    { label: "Вартість за добу:", key: "pricePerDay", suffix: "грн" },
    { label: "Загальна вартість:", key: "totalPrice", suffix: "грн" },
];

export const BOOKING_PAYMENT_DETAILS = [
    {
        label: "Запланований початок:", key: "plannedStart",
        formatter: (booking) => formatDateTime(booking, true)
    },
    {
        label: "Заплановане завершення:", key: "plannedEnd",
        formatter: (booking) => formatDateTime(booking, true)
    },
    { label: "До сплати:", key: "price", suffix: "грн" },
];

export const BOOKING_CONFIRM_DETAILS = [
    { label: "Автомобіль:", key: "car" },
    { label: "Ім'я та прізвище:", key: "fullName" },
    {
        label: "Запланований початок:", key: "plannedStart",
        formatter: (booking) => formatDateTime(booking, true)
    },
    {
        label: "Заплановане завершення:", key: "plannedEnd",
        formatter: (booking) => formatDateTime(booking, true)
    },
    { label: "Загальна вартість:", key: "price", suffix: "грн" },
];