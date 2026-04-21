import { requiredField } from "../../index.js";

export const getPlannedEndValidation = (plannedStart) => ({
    required: requiredField("Завершення"),
    validate: (value) => {
        if (!value || !plannedStart) return true;

        if (new Date(value) <= new Date(plannedStart)) {
            return "Дата завершення має бути пізніше за дату початку!";
        }

        return true;
    },
});