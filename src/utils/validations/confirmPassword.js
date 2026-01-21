export const getConfirmPasswordValidation = (getPasswordValue) => ({
    required: "Confirm password is required",
    validate: value => value === getPasswordValue() || "Passwords do not match"
});