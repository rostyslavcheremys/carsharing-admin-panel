import { requiredField } from "../../index.js";

export const getModelValidation = () => ({
    required: requiredField("Модель")
});