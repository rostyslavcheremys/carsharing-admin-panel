import { requiredField } from "../../index.js";

export const getRequiredFieldValidation = (value) => ({
    required: requiredField(value)
});