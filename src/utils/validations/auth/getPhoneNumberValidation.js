import { requiredField } from "../../index.js";

export const getPhoneNumberValidation = () => ({
    required: requiredField("Номер телефону"),
    pattern: {
        value: /^\+?[0-9]{10,20}$/,
        message: "Введіть дійсний номер телефону!",
    }
});