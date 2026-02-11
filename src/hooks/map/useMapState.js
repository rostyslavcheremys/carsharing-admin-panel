import { useState } from "react";

import { DEFAULT_ZOOM } from "../../constants";

export const useMapState = (initialZoom = DEFAULT_ZOOM) => {
    const [zoom, setZoom] = useState(initialZoom);
    const [mapType, setMapType] = useState("roadmap");

    return { zoom, setZoom, mapType, setMapType };
}