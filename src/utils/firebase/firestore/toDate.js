export const toDate = (value) => {
    return value?.toDate?.() ?? value ?? null;
}