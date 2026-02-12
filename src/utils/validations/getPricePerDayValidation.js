import { requiredField } from "../../utils";

export const getPricePerDayValidation = () => ({
    required: requiredField("Вартість за добу"),
    pattern: {
        value: /^[0-9]+$/,
        message: "Введіть тільки цифри!"
    },
    min: {
        value: 1,
        message: "Вартість за добу не може бути менше 1!"
    },
    max: {
        value: 100000,
        message: "Вартість за добу занадто велика."
    }
});