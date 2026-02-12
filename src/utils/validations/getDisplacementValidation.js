import { requiredField } from "../../utils";

export const getDisplacementValidation = () => ({
    required: requiredField("Об'єм двигуна"),
    pattern: {
        value: /^[0-9]+(\.[0-9]+)?$/,
        message: "Введіть тільки цифри!"
    },
    min: {
        value: 0,
        message: "Об'єм двигуна не може бути менше 0!"
    },
    max: {
        value: 10,
        message: "Об'єм двигуна занадто великий!"
    }
});