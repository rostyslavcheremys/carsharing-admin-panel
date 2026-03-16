import {
    DirectionsCarIcon,
    PersonIcon,
    EventNoteIcon,
    FactCheckIcon
} from "../../libs/mui-icons";

import {
    DialogCell,
    MapDialog,
    NavigateIconButton
} from "../../components";

import {
    getString,
    getFormattedTimestamp,
    getLabel
} from "../../utils";

import { TRIP_STATUS } from "./options.js";

export const TRIPS_TABLE_COLUMNS = [
    { id: "actions", label: "Дії" },
    {
        id: "id", label: "ID",
        render: (trip) => getString(trip?.id)
    },
    {
        id: "status", label: "Статус",
        render: (trip) => getLabel(trip?.status, TRIP_STATUS)
    },
    {
        id: "carId", label: "Автомобіль",
        render: (trip) => (
            <NavigateIconButton
                to={`/cars/${trip?.carId}`}
                Icon={DirectionsCarIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "userId", label: "Користувач",
        render: (trip) => (
            <NavigateIconButton
                to={`/users/${trip?.userId}`}
                Icon={PersonIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "bookingId", label: "Бронювання",
        render: (trip) => (
            <NavigateIconButton
                to={`/bookings/${trip?.bookingId}`}
                Icon={EventNoteIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "stateBeforeId", label: "Стан до поїздки",
        render: (trip) => (
            <NavigateIconButton
                to={`/car-state/${trip?.stateBeforeId}`}
                Icon={FactCheckIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "stateAfterId", label: "Стан після поїздки",
        render: (trip) => (
            <NavigateIconButton
                to={`/car-state/${trip?.stateAfterId}`}
                Icon={FactCheckIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "startLocation", label: "Початкове місцезнаходження",
        render: (trip) => (
            <DialogCell>
                {({ open, onOpen, onClose }) => (
                    <MapDialog
                        open={open}
                        onOpen={onOpen}
                        onClose={onClose}
                        latitude={trip?.startLocation?.latitude}
                        longitude={trip?.startLocation?.longitude}
                        status={trip?.status}
                        isDialogIcon={true}
                    />
                )}
            </DialogCell>
        )
    },
    {
        id: "endLocation", label: "Кінцеве місцезнаходження",
        render: (trip) => (
            <DialogCell>
                {({ open, onOpen, onClose }) => (
                    <MapDialog
                        open={open}
                        onOpen={onOpen}
                        onClose={onClose}
                        latitude={trip?.endLocation?.latitude}
                        longitude={trip?.endLocation?.longitude}
                        status={trip?.status}
                        isDialogIcon={true}
                    />
                )}
            </DialogCell>
        )
    },
    {
        id: "totalPrice", label: "Загальна вартість",
        render: (trip) => getString(trip?.totalPrice)
    },
    {
        id: "plannedStart", label: "Фактичний початок",
        render: (trip) => getFormattedTimestamp(trip?.actualStart, true)
    },
    {
        id: "plannedEnd", label: "Фактичне завершення",
        render: (trip) => getFormattedTimestamp(trip?.actualEnd, true)
    }
];