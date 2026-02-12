import { requiredAny } from "../../utils";

export const getRequiredAnyValidation = (value) => ({
    required: requiredAny(value)
});