import { VERIFICATION_STATUS } from "../users/options.js";

import { formatDateTime } from "../../utils";

export const PROFILE_DETAILS = [
    { label: "Ім’я:", key: "firstName" },
    { label: "Прізвище:", key: "lastName" },
    { label: "Верифікація:", key: "verificationStatus", map: VERIFICATION_STATUS },
    { label: "Електронна адреса:", key: "email" },
    { label: "Номер телефону:", key: "phoneNumber" },
    {
        label: "Дата народження:", key: "birthDate",
        formatter: (user) => formatDateTime(user)
    },
];