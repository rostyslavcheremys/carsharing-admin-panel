import { useState, useEffect } from "react";

export const useFullscreen = (ref) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggle = () => {
        const el = ref.current;
        if (!el) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            el.requestFullscreen();
        }
    }

    useEffect(() => {
        const handler = () =>
            setIsFullscreen(Boolean(document.fullscreenElement));

        document.addEventListener("fullscreenchange", handler);
        return () =>
            document.removeEventListener("fullscreenchange", handler);
    }, []);

    return { isFullscreen, toggle }
}