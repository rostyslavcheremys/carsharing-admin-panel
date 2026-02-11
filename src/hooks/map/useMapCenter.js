import { useMemo } from "react";

import { DEFAULT_LOCATION } from "../../constants";

export const useMapCenter = (activeItem) =>
    useMemo(
        () => activeItem
            ? { lat: activeItem.lat, lng: activeItem.lng }
            : DEFAULT_LOCATION,
        [activeItem]
    );