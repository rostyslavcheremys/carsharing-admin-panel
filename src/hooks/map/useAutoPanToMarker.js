import { useEffect } from "react";

import { DEFAULT_ZOOM } from "../../constants/index.js";

export const useAutoPanToMarker = (mapRef, locations, index) => {
    useEffect(() => {
        if (!mapRef.current || !locations || !locations[index]) return;

        const loc = locations[index];

        mapRef.current.panTo({ lat: loc.lat, lng: loc.lng });

        mapRef.current.setZoom(DEFAULT_ZOOM);

    }, [mapRef, locations, index]);
}