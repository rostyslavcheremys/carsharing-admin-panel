import { useRef, useMemo } from "react";

import { Loader, MapItem, MapControls } from "../../components";

import { useMapState, useGoogleMapsLoader, useMapCenter } from "../../hooks";

import { DEFAULT_LOCATION } from "../../constants";

export const MapPicker = ({
                              location,
                              status,
                              onSelect,
                              selectable = false,
                              className= "map"
                          }) => {
    const mapRef = useRef(null);
    const wrapperRef = useRef(null);

    const { zoom, setZoom, mapType, setMapType } = useMapState();

    const { isLoaded } = useGoogleMapsLoader();

    const mapCenter = useMapCenter(location || DEFAULT_LOCATION);

    const locations = useMemo(() =>
        (location ? [{ ...location, status, id: 'temp' }] : []), [location, status]
    );

    return (
        <Loader isLoading={!isLoaded}>
            <div className="map-container" ref={wrapperRef}>
                <MapItem
                    locations={locations}
                    mapCenter={mapCenter}
                    zoom={zoom}
                    mapType={mapType}
                    mapRef={mapRef}
                    isLoaded={isLoaded}
                    className={className}
                    selectable={selectable}
                    onSelect={onSelect}
                />
                <MapControls
                    zoom={zoom}
                    setZoom={setZoom}
                    mapType={mapType}
                    setMapType={setMapType}
                    mapCenter={mapCenter}
                    mapRef={mapRef}
                    wrapperRef={wrapperRef}
                    canCenter
                />
            </div>
        </Loader>
    );
}