import { useState, useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { IconButton } from "../../libs/mui";

import {
    AddIcon,
    RemoveIcon,
    FullscreenIcon,
    MapIcon,
    SatelliteAltIcon,
    RoomIcon,
} from "../../libs/mui-icons";

import { Loader } from "../../components";

import { useTheme } from "../../hooks";

import { DEFAULT_LOCATION } from "../../constants";

import { darkMap, lightMap } from "../../styles";
import {colors} from "@mui/material";

export const MapItem = ({
                            location,
                            className,
                            selectable = false,
                            onSelect
                        }) => {
    const { darkMode } = useTheme();
    const mapRef = useRef(null);

    const [marker, setMarker] = useState(location ?? DEFAULT_LOCATION);
    const [zoom, setZoom] = useState(14);
    const [mapType, setMapType] = useState("roadmap");

    const mapTypes = ["roadmap", "hybrid"];

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        language: "uk",
        region: "UA",
    });

    const handleMapClick = (e) => {
        if (!selectable) return;

        const newLocation = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }

        setMarker(newLocation);
        onSelect?.(newLocation);
    }

    const handleMapType = () => {
        const currentIndex = mapTypes.indexOf(mapType);
        const nextIndex = (currentIndex + 1) % mapTypes.length;
        setMapType(mapTypes[nextIndex]);
    };

    const handleCenterMarker = () => {
        mapRef.current?.panTo(marker);
    }

    const handleFullscreen = () => {
        if (mapRef.current) {
            const mapContainer = mapRef.current.getDiv();

            if (mapContainer.requestFullscreen) {
                mapContainer.requestFullscreen();
            } else if (mapContainer.webkitRequestFullscreen) {
                mapContainer.webkitRequestFullscreen();
            }
        }
    }

    useEffect(() => {
        setMarker(location);
    }, [location]);

    return (
        <Loader isLoading={!isLoaded}>
            <div className="map-item__wrapper">
                <GoogleMap
                    mapContainerClassName={className}
                    center={marker}
                    zoom={zoom}
                    mapTypeId={mapType}
                    onClick={handleMapClick}
                    options={{
                        styles: darkMode ? darkMap : lightMap,
                        disableDefaultUI: true,
                    }}
                    onLoad={(map) => (mapRef.current = map)}
                >
                    {marker &&
                        <Marker
                            position={marker}
                            className="marker"
                        />
                    }
                </GoogleMap>

                <div className="map-item__controls">
                    <IconButton
                        className="map-item__icon"
                        onClick={handleCenterMarker}
                    >
                        <RoomIcon />
                    </IconButton>

                    <IconButton
                        className="map-item__icon"
                        onClick={() => setZoom(z => z + 1)}
                    >
                        <AddIcon />
                    </IconButton>

                    <IconButton
                        className="map-item__icon"
                        onClick={() => setZoom(z => z - 1)}
                    >
                        <RemoveIcon />
                    </IconButton>

                    <IconButton
                        className="map-item__icon"
                        onClick={handleMapType}
                    >
                        {mapType === "roadmap" ? <MapIcon /> : <SatelliteAltIcon />}
                    </IconButton>

                    <IconButton
                        className="map-item__icon"
                        onClick={handleFullscreen}
                    >
                        <FullscreenIcon />
                    </IconButton>
                </div>
            </div>
        </Loader>
    );
}