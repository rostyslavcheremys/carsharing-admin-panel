import { requiredField, maxLengthField } from "../../index.js";

export const getFirstNameValidation = () => ({
    required: requiredField("Ім'я"),
    maxLength: maxLengthField("Ім'я", 30),
});