import { requiredField } from "../../index.js";

export const getLicensePlateValidation = () => ({
    required: requiredField("Номерний знак"),
    pattern: {
        value: /^[A-ZА-Я]{2}[0-9]{3,4}[A-ZА-Я]{2}$/,
        message: "Номерний знак має бути у форматі «AA1234BB»!"
    }
});