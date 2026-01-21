export const getAddressValidation = () => ({
    minLength: {
        value: 2,
        message: "At least 2 characters"
    },
    maxLength: {
        value: 50,
        message: "Maximum 50 characters"
    },
    required: "Address is required"
});