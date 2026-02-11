import { useState } from "react";

export const useActiveIndex = (length) => {
    const [index, setIndex] = useState(0);

    const safeSetIndex = (updater) => {
        setIndex(prev => {
            const next = typeof updater === "function" ? updater(prev) : updater;
            if (!length) return 0;
            return next >= length ? 0 : next;
        });
    }

    const prev = () =>
        safeSetIndex(i => (i - 1 + length) % length);

    const next = () =>
        safeSetIndex(i => (i + 1) % length);

    const reset = () => safeSetIndex(0);

    return { index, setIndex: safeSetIndex, prev, next, reset };
}
