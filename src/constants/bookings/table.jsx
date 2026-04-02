import { DirectionsCarIcon, PersonIcon } from "../../libs/mui-icons";

import { ConfirmNavigateIconButton } from "../../components";

import {
    getString,
    getFormattedTimestamp,
    getLabel
} from "../../utils";

import {
    ADMIN,
    CAR_ACTION_MESSAGES,
    USER_ACTION_MESSAGES
} from "../../constants";

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
            <ConfirmNavigateIconButton
                to={ADMIN.carDetails(booking?.carId)}
                Icon={DirectionsCarIcon}
                iconClassName="icon-button"
                message={CAR_ACTION_MESSAGES.VIEW_CONFIRM}
            />
        )
    },
    {
        id: "userId", label: "Користувач",
        render: (booking) => (
            <ConfirmNavigateIconButton
                to={ADMIN.userDetails(booking?.userId)}
                Icon={PersonIcon}
                iconClassName="icon-button"
                message={USER_ACTION_MESSAGES.VIEW_CONFIRM}
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