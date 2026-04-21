import { useCallback } from "react";

import { MIN_ZOOM, MAX_ZOOM } from "../../constants";

export const useMapZoom = (zoom, setZoom) => {
    const increase = useCallback(() => {
        setZoom(z => Math.min(MAX_ZOOM, z + 1));
    }, [setZoom]);

    const decrease = useCallback(() => {
        setZoom(z => Math.max(MIN_ZOOM, z - 1));
    }, [setZoom]);

    return { increase, decrease }
}