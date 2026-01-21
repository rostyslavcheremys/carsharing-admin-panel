export const getNameValidation = () => ({
    required: "Name is required",
    minLength: {
        value: 2,
        message: "At least 2 characters"
    },
    maxLength: {
        value: 50,
        message: "Maximum 50 characters"
    },
    pattern: {
        value: /^[A-Za-zА-Яа-яЇїІіЄєҐґ\s-]+$/,
        message: "Only letters, spaces, and hyphens"
    }
});