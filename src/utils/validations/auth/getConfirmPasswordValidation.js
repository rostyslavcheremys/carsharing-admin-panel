import { requiredField } from "../../index.js";

export const getConfirmPasswordValidation = (getPasswordValue) => ({
    required: requiredField("Підтвердіть пароль"),
    validate: (value) =>
        value === getPasswordValue() || "Паролі не співпадають!",
});