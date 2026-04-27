import { formatDays } from "../../utils";

export const formatDurationParts = (totalMinutes) => {
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    const parts = [];

    if (days > 0) {
        parts.push(`${days} ${formatDays(days)}`);
    }

    if (hours > 0) {
        parts.push(`${hours} год`);
    }

    if (minutes > 0 || parts.length === 0) {
        parts.push(`${minutes} хв`);
    }

    return parts;
}