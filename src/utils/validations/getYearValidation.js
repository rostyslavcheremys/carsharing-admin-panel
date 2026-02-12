import { requiredField } from "../../utils";

export const getYearValidation = () => ({
    required: requiredField("Рік випуску"),
    pattern: {
        value: /^[0-9]+$/,
        message: "Введіть тільки цифри!"
    },
    min: {
        value: 1900,
        message: "Рік випуску має бути не менше 1900!"
    },
    max: {
        value: new Date().getFullYear(),
        message: `Рік випуску не може бути більший за ${new Date().getFullYear()}!`
    }
});