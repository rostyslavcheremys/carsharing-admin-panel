import {
    DirectionsCarIcon,
    PersonIcon,
    EventNoteIcon,
    FactCheckIcon
} from "../../libs/mui-icons";

import {
    NavigateIconButton,
    DialogCell,
    MapDialog,
} from "../../components";

import {
    getString,
    formatDateTime,
    getLabel
} from "../../utils";

import { ADMIN } from "../../constants";

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
        id: "price", label: "Вартість",
        render: (trip) => getString(trip?.price)
    },
    {
        id: "additionalCharge", label: "Доплата",
        render: (trip) => getString(trip?.additionalCharge)
    },
    {
        id: "totalPrice", label: "Загальна вартість",
        render: (trip) => getString(trip?.totalPrice)
    },
    {
        id: "carId", label: "Автомобіль",
        render: (trip) => (
            <NavigateIconButton
                to={ADMIN.carDetails(trip?.carId)}
                Icon={DirectionsCarIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "userId", label: "Користувач",
        render: (trip) => (
            <NavigateIconButton
                to={ADMIN.userDetails(trip?.userId)}
                Icon={PersonIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "bookingId", label: "Бронювання",
        render: (trip) => (
            <NavigateIconButton
                to={ADMIN.bookingDetails(trip?.bookingId)}
                Icon={EventNoteIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "conditionStartId", label: "Стан перед поїздкою",
        render: (trip) => (
            <NavigateIconButton
                to={ADMIN.carConditionDetails(trip?.conditionStartId)}
                Icon={FactCheckIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "conditionEndId", label: "Стан після поїздки",
        render: (trip) => (
            <NavigateIconButton
                to={ADMIN.carConditionDetails(trip?.conditionEndId)}
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
        id: "plannedStart", label: "Початок",
        render: (trip) => formatDateTime(trip?.actualStart, true)
    },
    {
        id: "plannedEnd", label: "Завершення",
        render: (trip) => formatDateTime(trip?.actualEnd, true)
    }
];