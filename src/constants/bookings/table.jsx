import { getString, getFormattedTimestamp, getLabel } from "../../utils";

import { BOOKING_STATUS } from "./options.js";

import { IconButton } from "../../libs/mui.js";
import { DirectionsCarIcon, PersonIcon } from "../../libs/mui-icons.js";

export const BOOKINGS_TABLE_COLUMNS = (navigate) => [
    {
        id: "id", label: "ID",
        render: (booking) => getString(booking?.id)
    },
    {
        id: "carId", label: "Автомобіль",
        render: (booking) => (
            <IconButton onClick={() =>  navigate("/cars/" + booking?.carId)}>
                <DirectionsCarIcon className="car-actions__icon" />
            </IconButton>
        )
    },
    {
        id: "userId", label: "Користувач",
        render: (booking) => (
            <IconButton onClick={() =>  navigate("/users/" + booking?.userId)}>
                <PersonIcon className="car-actions__icon" />
            </IconButton>
        )
    },
    {
        id: "status", label: "Статус",
        render: (booking) => getLabel(booking?.status, BOOKING_STATUS)
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