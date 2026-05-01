import dayjs from "dayjs";

export const isDateInRange = (value, start, end) => {
    if (!value || !start || !end) return false;

    return dayjs(value).isBetween(dayjs(start), dayjs(end), null, "[]");
}

export const isDateInRanges = (value, ranges) => {
    if (!ranges?.length || !value) return false;

    return ranges.some(({ start, end }) =>
        isDateInRange(value, start, end)
    );
}