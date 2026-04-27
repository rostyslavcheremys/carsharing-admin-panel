import { formatDays } from "../../utils";

export const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (value) => String(value).padStart(2, "0");

    if (days > 0) {
        const parts = [`${days} ${formatDays(days)}`];

        if (hours > 0) parts.push(`${hours} год`);
        if (minutes > 0) parts.push(`${minutes} хв`);

        return parts.join(" ");
    }

    if (hours > 0) {
        const parts = [`${hours} год`];

        if (minutes > 0) parts.push(`${minutes} хв`);

        return parts.join(" ");
    }

    return `${pad(minutes)}:${pad(seconds)}`;
}