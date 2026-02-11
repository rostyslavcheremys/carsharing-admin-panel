import { useRef, useMemo } from "react";

import { Loader, MapItem, MapControls } from "../../components";

import { useMapState, useGoogleMapsLoader } from "../../hooks";

import { DEFAULT_LOCATION  } from "../../constants";

export const MapPicker = ({
                              location,
                              status,
                              onSelect,
                              selectable = false,
                          }) => {
    const mapRef = useRef(null);

    const { zoom, setZoom, mapType, setMapType } = useMapState();

    const { isLoaded } = useGoogleMapsLoader();

    const center = useMemo(() => location || DEFAULT_LOCATION, [location]);

    const locations = useMemo(() =>
        (location ? [{ ...location, status, id: 'temp' }] : []), [location, status]
    );

    return (
        <Loader isLoading={!isLoaded}>
            <div className="map-container">
                <MapItem
                    locations={locations}
                    mapCenter={center}
                    zoom={zoom}
                    mapType={mapType}
                    mapRef={mapRef}
                    isLoaded={isLoaded}
                    className="map"
                    selectable={selectable}
                    onSelect={onSelect}
                    mapCard
                />
                <MapControls
                    zoom={zoom}
                    setZoom={setZoom}
                    mapType={mapType}
                    setMapType={setMapType}
                    mapCenter={center}
                    mapRef={mapRef}
                    canCenter={!!location}
                />
            </div>
        </Loader>
    );
}