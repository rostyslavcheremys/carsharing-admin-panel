import { requiredField } from "../../index.js";

export const getPlannedStartValidation = () => ({
    required: requiredField("Початок"),
    validate: (value) => {
        if (!value) return true;

        const now = new Date();

        if (new Date(value) < now) {
            return "Дата початку не може бути в минулому!";
        }

        return true;
    },
});