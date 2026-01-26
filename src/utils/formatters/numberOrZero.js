export const getNumberOrZero = (value) => {
    if (!value) return 0;

    const number = parseFloat(value.toString().replace(/\s/g, '').replace(',', '.'));
    return isNaN(number) ? 0 : number;
};