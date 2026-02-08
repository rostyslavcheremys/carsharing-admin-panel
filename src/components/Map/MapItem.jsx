import { GoogleMap, Marker } from "@react-google-maps/api";

import { useMapOptions } from "../../hooks";

import { getMarkerIcon } from "../../utils";

export const MapItem = ({
                            locations,
                            className,
                            selectable,
                            onSelect,
                            zoom,
                            mapType,
                            mapCenter,
                            mapRef,
                            isLoaded
                        }) => {
    const mapOptions = useMapOptions();

    const handleMapClick = (e) => {
        if (!selectable) return;

        const newLocation = {
            lat: e.latLng.lat(), lng: e.latLng.lng()
        }

        onSelect?.(newLocation);
    }

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
                        icon={getMarkerIcon(marker.status)}
                    />
                ))}
        </GoogleMap>
    );
}