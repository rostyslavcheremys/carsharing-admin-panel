import { useEffect, useState } from "react";

import { formatTime } from "../utils";

export const useCountdown = (endTime) => {
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (!endTime) return;

        const update = () => {
            const now = Date.now();

            const targetTime = endTime?.toMillis
                ? endTime.toMillis()
                : new Date(endTime).getTime();

            const diff = Math.max(targetTime - now, 0);

            setRemainingTime(diff);
        };

        update();

        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return {
        remainingTime,
        remainingTimeFormatted: formatTime(remainingTime),
        isExpired: remainingTime === 0,
    };
};