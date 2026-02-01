export const getString = (value, suffix = "") => {
    if (value === null || value === undefined || value === "") return "";

    return `${value} ${suffix}`.trim();
}