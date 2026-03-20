import { ROLES, USER_STATUS } from "./options.js";

import { getFormattedTimestamp } from "../../utils";

export const USER_DETAILS = [
    { label: "ID:", key: "id" },
    { label: "Ім’я:", key: "firstName" },
    { label: "Прізвище:", key: "lastName" },
    { label: "Посвідчення водія:", key: "drivingLicense" },
    { label: "Електронна адреса:", key: "email" },
    { label: "Номер телефону:", key: "phoneNumber" },
    {
        label: "Дата народження:", key: "birthDate",
        formatter: (user) => getFormattedTimestamp(user)
    },
    { label: "Роль:", key: "role", map: ROLES },
    { label: "Статус:", key: "isBlocked", map: USER_STATUS },
    {
        label: "Дата створення:", key: "createdAt",
        formatter: (user) => getFormattedTimestamp(user, true)
    },
];