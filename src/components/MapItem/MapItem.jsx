import { useState, useEffect } from "react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { Loader } from "../../components";

import { useTheme } from "../../hooks";

import { darkMap, lightMap } from "../../styles";

export const MapItem = ({
                            location,
                            className,
                            selectable = false,
                            onSelect
                        }) => {
    const { darkMode } = useTheme();
    const [marker, setMarker] = useState(location);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        language: "uk",
        region: "UA",
    });

    const handleClick = (e) => {
        if (!selectable) return;

        const newLocation = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };

        setMarker(newLocation);
        onSelect?.(newLocation);
    }

    useEffect(() => {
        setMarker(location);
    }, [location]);

    return (
        <Loader isLoading={!isLoaded}>
            <GoogleMap
                mapContainerClassName={className}
                center={marker}
                zoom={14}
                onClick={handleClick}
                options={{
                    styles: darkMode ? darkMap : lightMap,
                    disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    fullscreenControl: true,
                }}
            >
                {marker && <Marker position={marker} />}
            </GoogleMap>
        </Loader>
    );
}