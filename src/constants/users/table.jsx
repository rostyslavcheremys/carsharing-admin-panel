import { getLabel, getString, getFormattedTimestamp } from "../../utils";

import { ROLES, USER_STATUS } from "./options.js";

export const USERS_TABLE_COLUMNS = [
    { id: "actions", label: "Дії" },
    {
        id: "id", label: "ID",
        render: (user) => getString(user?.id)
    },
    {
        id: "status",
        label: "Статус",
        render: (user) => getLabel(user?.isBlocked, USER_STATUS),
    },
    {
        id: "firstName", label: "Ім'я",
        render: (user) => getString(user?.firstName)
    },
    {
        id: "lastName", label: "Прізвище",
        render: (user) => getString(user?.lastName)
    },
    {
        id: "drivingLicense",
        label: "Посвідчення водія",
        render: (user) =>
            user?.drivingLicense ? (
                <a
                    href={user.drivingLicense}
                    target="_blank"
                    rel="noreferrer"
                >
                    Документ
                </a>
            ) : (
                "—"
            ),
    },
    {
        id: "email", label: "Електронна адреса",
        render: (user) => getString(user?.email)
    },
    {
        id: "phone", label: "Номер телефону",
        render: (user) => getString(user?.phone)
    },
    {
        id: "birthDate", label: "Дата народження",
        render: (user) => getFormattedTimestamp(user?.birthDate)
    },
    {
        id: "role", label: "Роль",
        render: (user) => getLabel(user?.role, ROLES)
    },
    {
        id: "createdAt", label: "Дата створення",
        render: (user) => getFormattedTimestamp(user?.createdAt, true)
    },
];