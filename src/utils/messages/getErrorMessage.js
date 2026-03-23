import { ERROR_MESSAGES } from "../../constants";

export const getErrorMessage = (error) => {
    const code = error?.code;

    if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];

    if (error?.message) return error.message;

    console.error("Unknown error:", error);

    return "Щось пішло не так. Спробуйте ще раз.";
}