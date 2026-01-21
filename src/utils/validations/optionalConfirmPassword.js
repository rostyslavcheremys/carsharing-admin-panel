export const getOptionalConfirmPasswordValidation = (watchPassword) => ({
    validate: (value) => {
        const password = watchPassword();
        if (!password) return true;
        if (!value) return "Confirm password";
        return value === password || "Passwords do not match";
    }
});