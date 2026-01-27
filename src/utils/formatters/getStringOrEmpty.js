export const getStringOrEmpty = (value, suffix = "") => {
    if (value === null || value === undefined || value === "") {
        return "—";
    }
    return `${value} ${suffix}`.trim();
};