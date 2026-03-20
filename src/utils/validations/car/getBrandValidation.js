import { requiredField } from "../../index.js";

export const getBrandValidation = () => ({
    required: requiredField("Марка")
});