import { requiredField } from "../../utils";

export const getRangeValidation = () => ({
    required: requiredField("Запас ходу"),
    pattern: {
        value: /^[0-9]+$/,
        message: "Введіть тільки цифри!"
    },
    min: {
        value: 1,
        message: "Запас ходу не може бути менше 1!"
    },
    max: {
        value: 1000,
        message: "Запас ходу занадто великий!"
    }
});