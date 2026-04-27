import { requiredField } from "../../index.js";

export const getPercentValidation = (fieldName) => ({
    required: requiredField(fieldName),
    pattern: {
        value: /^(100|[1-9]?\d)$/,
        message: `${fieldName} має бути від 0 до 100%!`
    },
    min: {
        value: 0,
        message: `${fieldName} не може бути менше 0%!`
    },
    max: {
        value: 100,
        message: `${fieldName} не може бути більше 100%!`
    }
});