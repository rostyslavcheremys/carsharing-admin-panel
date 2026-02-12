import { requiredField } from "../../utils";

export const getMileageValidation = () => ({
    required: requiredField("Пробіг"),
    pattern: {
        value: /^[0-9]+$/,
        message: "Введіть тільки цифри!"
    },
    min: {
        value: 1,
        message: "Пробіг не може бути менше 1!"
    },
    max: {
        value: 1000000,
        message: "Пробіг занадто великий!"
    }
});