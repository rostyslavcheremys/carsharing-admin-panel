export const getPasswordValidation = () => ({
    required: "Пароль є обовʼязковим",
    minLength: {
        value: 8,
        message: "Мінімум 8 символів"
    },

    validate: {
        uppercase: v => /[A-Z]/.test(v) || "Додайте велику літеру",
        lowercase: v => /[a-z]/.test(v) || "Додайте малу літеру",
        number: v => /[0-9]/.test(v) || "Додайте цифру",
        symbol: v => /[^A-Za-z0-9]/.test(v) || "Додайте спецсимвол"
    }
});