import { ROLES, USER_STATUS, VERIFICATION_STATUS } from "./options.js";

import { getFormattedTimestamp } from "../../utils";

export const USER_DETAILS = [
    { label: "ID:", key: "id" },
    { label: "Статус:", key: "isBlocked", map: USER_STATUS },
    { label: "Роль:", key: "role", map: ROLES },
    { label: "Ім’я:", key: "firstName" },
    { label: "Прізвище:", key: "lastName" },
    { label: "Верифікація:", key: "verificationStatus", map: VERIFICATION_STATUS },
    { label: "Електронна адреса:", key: "email" },
    { label: "Номер телефону:", key: "phoneNumber" },
    {
        label: "Дата народження:", key: "birthDate",
        formatter: (user) => getFormattedTimestamp(user)
    },
    {
        label: "Дата створення:", key: "createdAt",
        formatter: (user) => getFormattedTimestamp(user, true)
    },
];