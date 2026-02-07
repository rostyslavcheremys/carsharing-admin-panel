import { useState, useEffect, useRef, useMemo } from "react";
``
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { IconButton } from "../../libs/mui";

import {
    AddIcon,
    RemoveIcon,
    MapIcon,
    RoomIcon,
    SatelliteAltIcon,
    FullscreenIcon,
    FullscreenExitIcon
} from "../../libs/mui-icons";

import { Loader } from "../../components";

import { useTheme } from "../../hooks";

import {
    DEFAULT_LOCATION,
    WORLD_BOUNDS,
    MIN_ZOOM,
    MAX_ZOOM
} from "../../constants";

import { darkMap, lightMap } from "../../styles";

export const MapItem = ({
                            locations = [],
                            className,
                            selectable = false,
                            onSelect,
                            shouldCenter = false
                        }) => {
    const { darkMode } = useTheme();
    const mapRef = useRef(null);
    const wrapperRef = useRef(null);

    const [zoom, setZoom] = useState(14);
    const [mapType, setMapType] = useState("roadmap");
    const [isFullscreen, setIsFullscreen] = useState(false);

    const markers = useMemo(() => {
        return locations?.length ? locations : [DEFAULT_LOCATION];
    }, [locations]);

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
        };

        onSelect?.(newLocation);
    }

    const handleMapType = () => {
        const nextIndex = (mapTypes.indexOf(mapType) + 1) % mapTypes.length;
        setMapType(mapTypes[nextIndex]);
    }

    const handleCenterMarker = () => {
        if (!markers.length) return;
        mapRef.current?.panTo(markers[0]);
    }

    const handleFullscreen = () => {
        const el = wrapperRef.current;
        if (!el) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            el.requestFullscreen?.() || el.webkitRequestFullscreen?.();
        }
    }

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener("fullscreenchange", onFullscreenChange);
        document.addEventListener("webkitfullscreenchange", onFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", onFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
        };
    }, []);

    return (
        <Loader isLoading={!isLoaded}>
            <div className="map-item__wrapper" ref={wrapperRef}>
                <GoogleMap
                    mapContainerClassName={className}
                    center={markers[0]}
                    zoom={zoom}
                    mapTypeId={mapType}
                    onClick={handleMapClick}
                    options={{
                        styles: darkMode ? darkMap : lightMap,
                        disableDefaultUI: true,
                        restriction: {
                            latLngBounds: WORLD_BOUNDS,
                            strictBounds: true,
                        },
                    }}
                    onLoad={(map) => (mapRef.current = map)}
                >
                    {isLoaded &&
                        markers.map((marker, index) => (
                        <Marker
                            key={`${marker.lat}-${marker.lng}-${index}`}
                            position={marker}
                            icon={{
                                url: "/src/assets/car-gray.svg",
                                scaledSize: new window.google.maps.Size(48, 48),
                                anchor: new window.google.maps.Point(24, 24),
                            }}
                        />
                    ))}
                </GoogleMap>

                <div className="map-item__controls">
                    {shouldCenter && (
                        <IconButton
                            className="map-item__icon"
                            onClick={handleCenterMarker}
                        >
                            <RoomIcon />
                        </IconButton>
                    )}

                    <IconButton
                        className="map-item__icon"
                        onClick={() =>
                            setZoom(z => Math.min(z + 1, MAX_ZOOM))
                        }
                    >
                        <AddIcon />
                    </IconButton>

                    <IconButton
                        className="map-item__icon"
                        onClick={() =>
                            setZoom(z => Math.max(z - 1, MIN_ZOOM))
                        }
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
                        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                </div>
            </div>
        </Loader>
    );
}