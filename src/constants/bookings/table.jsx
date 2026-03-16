import { DirectionsCarIcon, PersonIcon } from "../../libs/mui-icons";

import { NavigateIconButton } from "../../components";

import { getString, getFormattedTimestamp, getLabel } from "../../utils";

import { BOOKING_STATUS } from "./options.js";

export const BOOKINGS_TABLE_COLUMNS = [
    { id: "actions", label: "Дії" },
    {
        id: "id", label: "ID",
        render: (booking) => getString(booking?.id)
    },
    {
        id: "status", label: "Статус",
        render: (booking) => getLabel(booking?.status, BOOKING_STATUS)
    },
    {
        id: "carId", label: "Автомобіль",
        render: (booking) => (
            <NavigateIconButton
                to={`/cars/${booking?.carId}`}
                Icon={DirectionsCarIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "userId", label: "Користувач",
        render: (booking) => (
            <NavigateIconButton
                to={`/users/${booking?.userId}`}
                Icon={PersonIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "plannedStart", label: "Запланований початок",
        render: (booking) => getFormattedTimestamp(booking?.plannedStart, true)
    },
    {
        id: "plannedEnd", label: "Заплановане завершення",
        render: (booking) => getFormattedTimestamp(booking?.plannedEnd, true)
    },
    {
        id: "createdAt", label: "Дата створення",
        render: (booking) => getFormattedTimestamp(booking?.createdAt, true)
    },
];