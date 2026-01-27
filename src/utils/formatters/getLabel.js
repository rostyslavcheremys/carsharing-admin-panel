export const getLabel = (value, options) => {
    if (!value) return "—";
    const found = options.find((option) => option.value === value);
    return found ? found.label : value;
};