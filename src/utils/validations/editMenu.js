export const getEditMenu = {
    name: {
        required: "Name is required",
        minLength: {
            value: 2,
            message: "Name must be at least 2 characters"
        },
        maxLength: {
            value: 200,
            message: "Name must be less than 200 characters"
        },
    },

    price: {
        required: "Price is required",
        min: {
            value: 1,
            message: "Price must be greater than 0"
        },
        max: {
            value: 10000,
            message: "Price must be less than or equal to 10,000"
        },
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: "Enter a valid number"
        },
    },

    discount: {
        required: "Discount is required",
        min: {
            value: 0,
            message: "Discount cannot be less than 0"
        },
        max: {
            value: 100,
            message: "Discount cannot be greater than 100"
        },
        pattern: {
            value: /^(100|[0-9]{1,2})$/,
            message: "Discount must be a number from 0 to 100"
        },
    },

    size: {
        required: "Size is required",
        pattern: {
            value: /^[1-9][0-9]*$/,
            message: "Size must be a positive integer"
        },
    },

    available_quantity: {
        required: "Quantity is required",
        pattern: {
            value: /^[0-9]+$/, message: "Must be a positive number"
        },
        min: {
            value: 1, message: "Must be greater than 0"
        },
    },

    image_url: {
        maxLength: {
            value: 500,
            message: "URL must be less than 500 characters"
        },
        pattern: {
            value: /^https?:\/\/.+$/i,
            message: "Image URL must be valid (http/https)"
        },
    },

    description: {
        maxLength: {
            value: 1000,
            message: "Description must be less than 1000 characters"
        },
    },
};