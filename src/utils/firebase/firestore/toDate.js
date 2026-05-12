export const toDate = (value) => {
    if (!value) return null;

    if (value?.toDate) return value.toDate();

    if (value instanceof Date) return value;

    return new Date(value);
}