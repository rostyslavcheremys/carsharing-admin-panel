import { requiredField } from "../../index.js";

export const getEmailValidation = () => ({
    required: requiredField("Електронна адреса"),
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Введіть коректну електронну адреса!"
    }
});