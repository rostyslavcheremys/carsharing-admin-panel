import { useCallback } from "react";

export const useMapCenterAction = ({ mapRef, canCenter = true }) => {
    const centerMap = useCallback((center) => {
        if (!canCenter) return;
        if (!mapRef?.current) return;

        const lat = Number(center?.lat);
        const lng = Number(center?.lng);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        mapRef.current.panTo({ lat, lng });
    }, [mapRef, canCenter]);

    return { centerMap }
}