import { FactCheckIcon } from "../../libs/mui-icons";

import { NavigateIconButton } from "../../components";

import {
    getString,
    formatDateTime,
    getLabel,
    getCarName
} from "../../utils";

import { USER } from "../../constants";

import { TRIP_STATUS } from "./options.js";

export const TRIP_HISTORY_TABLE_COLUMNS = (carsMap) => [
    { id: "actions", label: "Дії" },
    {
        id: "carId", label: "Автомобіль",
        render: (booking) => getCarName(carsMap?.[booking?.carId])
    },
    {
        id: "status", label: "Статус",
        render: (trip) => getLabel(trip?.status, TRIP_STATUS)
    },
    {
        id: "price", label: "Вартість",
        render: (trip) => getString(trip?.price, "грн")
    },
    {
        id: "additionalCharge", label: "Доплата",
        render: (trip) => getString(trip?.additionalCharge, "грн")
    },
    {
        id: "totalPrice", label: "Загальна вартість",
        render: (trip) => getString(trip?.totalPrice, "грн")
    },
    {
        id: "conditionStartId", label: "Початкова фотофіксація",
        render: (trip) => (
            <NavigateIconButton
                to={USER.tripConditionDetails(trip?.id, trip?.conditionStartId)}
                Icon={FactCheckIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "conditionEndId", label: "Кінцева фотофіксація",
        render: (trip) => (
            <NavigateIconButton
                to={USER.tripConditionDetails(trip?.id, trip?.conditionEndId)}
                Icon={FactCheckIcon}
                iconClassName="icon-button"
            />
        )
    },
    {
        id: "plannedStart", label: "Початок",
        render: (trip) => formatDateTime(trip?.actualStart, true)
    },
    {
        id: "plannedEnd", label: "Завершення",
        render: (trip) => formatDateTime(trip?.actualEnd, true)
    },
    {
        id: "rating", label: "Рейтинг",
        render: (car) => getString(car?.rating, "★")
    },
];