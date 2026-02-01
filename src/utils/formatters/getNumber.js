export const getNumber = (value) => {
    if (value === null || value === undefined || value === "") return "";

    const number = parseFloat(value
        .toString()
        .replace(/\s/g, '')
        .replace(',', '.'));

    return isNaN(number) ? "" : number;
}