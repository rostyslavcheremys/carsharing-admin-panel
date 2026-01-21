export const getOptionalPasswordValidation = () => ({
    validate: (value) => {
        if (!value) return true;

        if (value.length < 8) return "At least 8 characters";
        if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
        if (!/[a-z]/.test(value)) return "Include at least one lowercase letter";
        if (!/[0-9]/.test(value)) return "Include at least one number";
        if (!/[^A-Za-z0-9]/.test(value)) return "Include at least one special character";

        return true;
    }
});