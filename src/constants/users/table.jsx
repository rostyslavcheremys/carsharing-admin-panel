export const USERS_TABLE_COLUMNS = [
    { id: "id", label: "ID" },
    { id: "firstName", label: "Ім'я" },
    { id: "lastName", label: "Прізвище" },
    {
        id: "drivingLicenseDocument",
        label: "Посвідчення",
        render: (_, row) =>
            row?.drivingLicense?.document ? (
                <a
                    href={row.drivingLicense.document}
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
        id: "drivingLicenseStatus",
        label: "Статус",
        render: (_, row) =>
            row?.drivingLicense?.verified ? "Підтверджено" : "Не підтверджено",
    },
    { id: "email", label: "Електронна адреса" },
    { id: "phone", label: "Номер телефону" },
    { id: "birthDate", label: "Дата народження",
        render: (v) =>
            v ? v.toDate().toLocaleDateString() : "—",
    },
    { id: "role", label: "Роль" },
    { id: "createdAt", label: "Дата створення",
        render: (v) =>
            v ? v.toDate().toLocaleDateString() : "—",
    },
];