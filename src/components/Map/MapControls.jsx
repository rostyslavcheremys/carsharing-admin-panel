import { useCallback } from "react";

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

import { useFullscreen } from "../../hooks";

import {
    MIN_ZOOM,
    MAX_ZOOM,
    MAP_TYPES,
} from "../../constants";

export const MapControls = ({
                                zoom,
                                setZoom,
                                mapType,
                                setMapType,
                                canCenter,
                                mapCenter,
                                mapRef,
                                wrapperRef,
                            }) => {
    const { isFullscreen, toggle } = useFullscreen(wrapperRef);

    const handleZoomChange = useCallback((delta) => {
        setZoom(z => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)));
    }, [setZoom]);

    const handleMapType = () => {
        setMapType(prev => {
            const index = MAP_TYPES.indexOf(prev);
            return MAP_TYPES[(index + 1) % MAP_TYPES.length];
        });
    }

    const handleCenterMarker = () => {
        if (!canCenter || !mapRef.current) return;
        mapRef.current.panTo(mapCenter);
    };

    return(
        <div className="map-controls">
            <IconButton
                className="map__icon"
                onClick={handleCenterMarker}
            >
                <RoomIcon />
            </IconButton>

            <IconButton
                className="map__icon"
                disabled={zoom >= MAX_ZOOM}
                onClick={() => handleZoomChange(1)}
            >
                <AddIcon />
            </IconButton>

            <IconButton
                className="map__icon"
                disabled={zoom <= MIN_ZOOM}
                onClick={() => handleZoomChange(-1)}
            >
                <RemoveIcon />
            </IconButton>

            <IconButton
                className="map__icon"
                onClick={handleMapType}
            >
                {mapType === "roadmap" ? <MapIcon /> : <SatelliteAltIcon />}
            </IconButton>

            <IconButton
                className="map__icon"
                onClick={toggle}
            >
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
        </div>
    );
}