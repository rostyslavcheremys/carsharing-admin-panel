import { requiredField } from "../../utils";

export const getCapacityValidation = () => ({
    required: requiredField("Ємність батареї"),
    pattern: {
        value: /^[0-9]+$/,
        message: "Введіть тільки цифри!"
    },
    min: {
        value: 1,
        message: "Ємність батареї не може бути менше 1!"
    },
    max: {
        value: 200,
        message: "Ємність батареї занадто велика!"
    }
});