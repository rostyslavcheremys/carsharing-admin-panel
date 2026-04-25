export const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (value) => String(value).padStart(2, "0");

    if (days > 0) {
        return `${days} днів ${hours} год ${minutes} хв`;
    }

    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    return `${pad(minutes)}:${pad(seconds)}`;
}