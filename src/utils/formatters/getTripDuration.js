import { formatDurationParts } from "../../utils";

export const getTripDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "—";

    const getTime = (value) =>
        value?.toMillis
            ? value.toMillis()
            : new Date(value).getTime();

    const diff = Math.max(getTime(endTime) - getTime(startTime), 0);

    const totalMinutes = Math.floor(diff / 60000);

    return formatDurationParts(totalMinutes).join(" ");
}