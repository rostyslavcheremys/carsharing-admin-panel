import { requiredField } from "../../utils";

export const getRequiredFieldValidation = (value) => ({
    required: requiredField(value)
});