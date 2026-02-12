import { getFormattedTimestamp, getLabel } from "../../utils";

import {
    DRIVING_LICENCE_STATUS,
    ROLE,
} from "./options.js";

export const USERS_TABLE_COLUMNS = [
    { id: "id", label: "ID" },
    { id: "firstName", label: "Ім'я" },
    { id: "lastName", label: "Прізвище" },
    {
        id: "drivingLicenseDocument",
        label: "Посвідчення",
        render: (user) =>
            user?.drivingLicense?.document ? (
                <a
                    href={user.drivingLicense.document}
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
        id: "drivingLicenseStatus", label: "Статус",
        render: (user) => getLabel(user?.drivingLicense?.verified, DRIVING_LICENCE_STATUS)
    },
    { id: "email", label: "Електронна адреса" },
    { id: "phone", label: "Номер телефону" },
    {
        id: "birthDate", label: "Дата народження",
        render: (user) => getFormattedTimestamp(user?.birthDate)
    },
    {
        id: "role", label: "Роль",
        render: (user) => getLabel(user?.role, ROLE)
    },
    {
        id: "createdAt", label: "Дата створення",
        render: (user) => getFormattedTimestamp(user?.createdAt)
    },
];