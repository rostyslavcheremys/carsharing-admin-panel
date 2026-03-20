import { requiredField, maxLengthField } from "../../index.js";

export const getLastNameValidation = () => ({
    required: requiredField("Прізвище"),
    maxLength: maxLengthField("Прізвище", 30),
});