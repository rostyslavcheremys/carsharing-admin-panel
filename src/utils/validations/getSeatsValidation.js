import { requiredField } from "../../utils";

export const getSeatsValidation = () => ({
    required: requiredField("Кількість місць"),
    pattern: {
        value: /^[0-9]+$/,
        message: "Введіть тільки цифри!"
    },
    min: {
        value: 1,
        message: "Кількість місць не може бути менше 1!"
    },
    max: {
        value: 9,
        message: "Кількість місць занадто велика."
    }
});