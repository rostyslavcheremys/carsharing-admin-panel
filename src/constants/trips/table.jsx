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
        id: "beforeConditionId", label: "Стан до поїздки",
        render: (trip) => (
            <NavigateIconButton
                to={ADMIN.carConditionDetails(trip?.beforeConditionId)}
                Icon={FactCheckIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "afterConditionId", label: "Стан після поїздки",
        render: (trip) => (
            <NavigateIconButton
                to={ADMIN.carConditionDetails(trip?.afterConditionId)}
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