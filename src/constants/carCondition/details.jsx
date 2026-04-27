import { DetailsLink } from "../../components";

import { formatDateTime } from "../../utils";

import { ADMIN } from "../../constants";

import { CONDITION_TYPE } from "./options.js";

export const CAR_CONDITION_DETAILS = [
    { label: "ID:", key: "id" },
    { label: "Стан:", key: "conditionType", map: CONDITION_TYPE },
    {
        label: "Автомобіль:", key: "carId",
        formatter: (id) => <DetailsLink to={ADMIN.carDetails(id)} />
    },
    {
        label: "Користувач:", key: "userId",
        formatter: (id) => <DetailsLink to={ADMIN.userDetails(id)} />
    },
    {
        label: "Поїздка:", key: "tripId",
        formatter: (id) => <DetailsLink to={ADMIN.tripDetails(id)} />
    },
    { label: "Опис:", key: "description" },
    { label: "Пробіг:", key: "mileage", suffix: "км" },
    { label: "Рівень пального:", key: "energyLevel.fuelPercent", suffix: "%" },
    { label: "Рівень заряду батареї:", key: "energyLevel.batteryPercent", suffix: "%" },
    {
        label: "Дата створення:", key: "createdAt",
        formatter: (user) => formatDateTime(user, true)
    },
];