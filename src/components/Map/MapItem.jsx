import { useMemo, useState } from "react";

import { GoogleMap, Marker } from "@react-google-maps/api";

import { MapCard } from "../../components";

import { useMapOptions } from "../../hooks";

import { getCarMarkerIcon, getPickerMarkerIcon } from "../../utils";

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
                            mapCard
                        }) => {
    const mapOptions = useMapOptions();
    const [markerCard, setMarkerCard] = useState(null);

    const handleMapClick = (e) => {
        if (!selectable) return;

        setMarkerCard(null);
        onSelect?.({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };

    const locationIcon = useMemo(
        () => (selectable ? getPickerMarkerIcon() : null),
        [selectable]
    );

    return (
        <GoogleMap
            mapContainerClassName={className}
            center={mapCenter}
            zoom={zoom}
            mapTypeId={mapType}
            onClick={handleMapClick}
            onLoad={(map) => (mapRef.current = map)}
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
                ))}

            {mapCard && (
                <MapCard
                    car={markerCard}
                    onClose={() => setMarkerCard(null)}
                />
            )}
        </GoogleMap>
    );
};
