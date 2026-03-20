import { requiredAny } from "../../index.js";

export const getRequiredAnyValidation = (value) => ({
    required: requiredAny(value)
});