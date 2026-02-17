import { useState, useCallback, useEffect } from "react";

import { GoogleMap, Marker } from "@react-google-maps/api";

import { MapDetailsDialog } from "../../components";

import { useAutoPanToMarker, useMapOptions} from "../../hooks";

import { getPickerMarkerIcon, getCarMarkerIcon, } from "../../utils";

export const MapItem = ({
                            locations,
                            className,
                            selectable,
                            onSelect,
                            zoom,
                            mapType,
                            mapCenter,
                            mapRef,
                            isLoaded,
                            mapCard,
                            activeIndex
                        }) => {
    const [markerCard, setMarkerCard] = useState(null);

    const mapOptions = useMapOptions();

    const handleMapClick = useCallback((e) => {
        if (!selectable) return;

        setMarkerCard(null);

        onSelect?.({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }, [selectable, onSelect]);

    const handleMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [mapRef]);

    const locationIcon = selectable ? getPickerMarkerIcon() : null;

    useEffect(() => {
        mapRef.current?.panTo(mapCenter);
    }, [mapCenter, mapRef]);

    useAutoPanToMarker(mapRef, locations, activeIndex);

    return (
        <GoogleMap
            mapContainerClassName={className}
            center={mapCenter}
            zoom={zoom}
            mapTypeId={mapType}
            onClick={handleMapClick}
            onLoad={handleMapLoad}
            options={mapOptions}
        >
            {isLoaded &&
                locations.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={selectable ? locationIcon : getCarMarkerIcon(marker.status)}
                        onClick={() => mapCard && setMarkerCard(marker)}
                    />
                ))
            }

            {mapCard && (
                <div className="map-item__card">
                    <MapDetailsDialog
                        car={markerCard}
                        onClose={() => setMarkerCard(null)}
                    />
                </div>
            )}
        </GoogleMap>
    );
}