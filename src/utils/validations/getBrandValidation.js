import { requiredField } from "../../utils";

export const getBrandValidation = () => ({
    required: requiredField("Марка")
});