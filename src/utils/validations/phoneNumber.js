export const getPhoneNumberValidation = () => ({
    required: "Phone number is required",
    pattern: {
        value: /^\+?[0-9\s-]{10,20}$/,
        message: "Enter a valid phone number"
    }
});