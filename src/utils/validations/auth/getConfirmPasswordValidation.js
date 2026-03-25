import { requiredField } from "../../index.js";

export const getConfirmPasswordValidation = (getPasswordValue) => ({
    required: requiredField("Підтвердження пароля"),
    validate: (value) =>
        value === getPasswordValue() || "Паролі не співпадають!",
});