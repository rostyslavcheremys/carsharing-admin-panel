import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { Loader } from "../../components";

import { useTheme } from "../../hooks";

import { darkMap, lightMap } from "../../styles";

export const MonitoringMap = ({ center }) => {
    const { darkMode } = useTheme();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    return (
        <Loader isLoading={!isLoaded}>
            <GoogleMap
                key={darkMode ? "map-dark" : "map-light"}
                center={center}
                zoom={14}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{
                    styles: darkMode ? darkMap : lightMap,
                    disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    fullscreenControl: true,
                }}
            >
                <Marker position={center} />
            </GoogleMap>
        </Loader>
    );
};