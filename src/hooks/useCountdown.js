import { useEffect, useRef, useState } from "react";

import { formatTime } from "../utils";

export const useCountdown = (endTime) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!endTime) return;

        const getTargetTime = () =>
            endTime?.toMillis ? endTime.toMillis() : new Date(endTime).getTime();

        const update = () => {
            const now = Date.now();
            const diff = Math.max(getTargetTime() - now, 0);

            setRemainingTime(diff);

            if (diff <= 0 && intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        update();

        intervalRef.current = setInterval(update, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [endTime]);

    const isExpired = remainingTime <= 0;

    return {
        remainingTime,
        remainingTimeFormatted: formatTime(remainingTime),
        isExpired,
    };
};