import dayjs from "dayjs";

import { requiredField } from "../../index.js";

export const getBirthDateValidation = () => ({
    required: requiredField("Дата народження"),
    validate: (value) => {
        if (!value) return true;

        if (!value.isBefore(dayjs(), "day")) {
            return "Оберіть коректну дату народження!";
        }

        const age = dayjs().diff(value, "year");

        if (age < 18) {
            return "Мінімальний вік - 18 років!";
        }

        return true;
    },
});