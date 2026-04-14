import { useMemo } from "react";

export const useImages = (images) => {
    return useMemo(() => {
        if (!images) return [];
        return Array.isArray(images) ? images : [images];
    }, [images]);
}