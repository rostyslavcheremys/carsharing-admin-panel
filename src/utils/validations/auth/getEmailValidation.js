import { requiredField } from "../../index.js";

export const getEmailValidation = () => ({
    required: requiredField("Електронна пошта"),
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Введіть коректну електронну пошту!"
    }
});