export const getFormattedTimestamp = (value) => {
    if (!value) return "—";

    if (typeof value.toDate === "function") {
        return value.toDate().toLocaleDateString("uk-UA");
    }

    if (value.seconds !== undefined) {
        return new Date(
            value.seconds * 1000 + (value.nanoseconds ?? 0) / 1_000_000
        ).toLocaleDateString("uk-UA");
    }
    const date = new Date(value);
    return isNaN(date) ? "—" : date.toLocaleDateString("uk-UA");
};