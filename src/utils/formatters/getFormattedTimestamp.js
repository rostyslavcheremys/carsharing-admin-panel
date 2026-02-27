export const getFormattedTimestamp = (value, withTime = false) => {
    if (!value) return "—";

    let date;

    if (typeof value?.toDate === "function") {
        date = value.toDate();
    } else if (value?.seconds !== undefined) {
        date = new Date(value.seconds * 1000);
    } else {
        date = new Date(value);
    }

    if (isNaN(date)) return "—";

    const datePart = date.toLocaleDateString("uk-UA");

    if (!withTime) return datePart;

    const timePart = date.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${datePart}, ${timePart}`;
};