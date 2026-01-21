export const getEmailValidation = () => ({
    required: "Електронна пошта є обовʼязковою",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Введіть коректну електронну пошту"
    }
});