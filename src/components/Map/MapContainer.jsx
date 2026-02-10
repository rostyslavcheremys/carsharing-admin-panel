import { useState, useRef, useMemo } from "react";

import { Loader, MapItem, MapControls } from "../../components";

import { useGoogleMapsLoader } from "../../hooks";

import { normalizeLocation } from "../../utils";

import { DEFAULT_LOCATION, DEFAULT_ZOOM } from "../../constants";

export const MapContainer = ({
                                 locations = [],
                                 shouldCenter= false,
                                 selectable = false,
                                 onSelect,
                                 className,
                                 mapCard
                             }) => {
    const mapRef = useRef(null);
    const wrapperRef = useRef(null);

    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const [mapType, setMapType] = useState("roadmap");

    const { isLoaded } = useGoogleMapsLoader();

    const normalizedLocations = useMemo(() => {
        if (!locations) return [];

        const locationsArray = Array.isArray(locations) ? locations : [locations];

        return locationsArray
            .map(normalizeLocation)
            .filter(Boolean);
    }, [locations]);

    const mapCenter = useMemo(() => {
        if (!normalizedLocations.length) return DEFAULT_LOCATION;

        const { lat, lng } = normalizedLocations[0];

        return { lat, lng }
    }, [normalizedLocations]);

    return(
        <Loader isLoading={!isLoaded}>
            <div className="map-container" ref={wrapperRef}>
                <MapItem
                    locations={normalizedLocations}
                    className={className}
                    selectable={selectable}
                    onSelect={onSelect}
                    zoom={zoom}
                    mapType={mapType}
                    mapCenter={mapCenter}
                    mapRef={mapRef}
                    isLoaded={isLoaded}
                    mapCard={mapCard}
                />

                <MapControls
                    zoom={zoom}
                    setZoom={setZoom}
                    mapType={mapType}
                    setMapType={setMapType}
                    canCenter={normalizedLocations.length > 0}
                    mapCenter={mapCenter}
                    shouldCenter={shouldCenter}
                    mapRef={mapRef}
                    wrapperRef={wrapperRef}
                />
            </div>
        </Loader>
    );
}