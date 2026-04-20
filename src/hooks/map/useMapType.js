import { useCallback } from "react";

export const useMapType = (mapType, setMapType, types) => {
    const toggle = useCallback(() => {
        setMapType(prev => {
            const index = types.indexOf(prev);
            return types[(index + 1) % types.length];
        });
    }, [setMapType, types]);

    return {
        mapType,
        toggle
    }
}