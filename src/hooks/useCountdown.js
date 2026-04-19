import { useEffect, useState } from "react";

import { formatTime } from "../utils";

export const useCountdown = (expiresAt) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!expiresAt) return;

        const update = () => {
            const now = Date.now();

            const endTime = expiresAt.toMillis
                ? expiresAt.toMillis()
                : new Date(expiresAt).getTime();

            const diff = endTime - now;

            setTimeLeft(diff > 0 ? diff : 0);
        };

        update();
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    return {
        timeLeft,
        timeLeftFormatted: formatTime(timeLeft),
    }
}