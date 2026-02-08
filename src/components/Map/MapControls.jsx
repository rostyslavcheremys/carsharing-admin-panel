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
                                shouldCenter,
                                mapRef,
                                wrapperRef,
                            }) => {
    const { isFullscreen, toggle } = useFullscreen(wrapperRef);

    const handleZoomChange = (value) => {
        setZoom(z =>
            Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + value))
        );
    }

    const handleZoomIn = () => handleZoomChange(1);
    const handleZoomOut = () => handleZoomChange(-1);

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
            {shouldCenter && (
                <IconButton
                    className="map-controls__icon"
                    onClick={handleCenterMarker}
                >
                    <RoomIcon />
                </IconButton>
            )}

            <IconButton
                className="map-controls__icon"
                disabled={zoom >= MAX_ZOOM}
                onClick={handleZoomIn}
            >
                <AddIcon />
            </IconButton>

            <IconButton
                className="map-controls__icon"
                disabled={zoom <= MIN_ZOOM}
                onClick={handleZoomOut}
            >
                <RemoveIcon />
            </IconButton>

            <IconButton
                className="map-controls__icon"
                onClick={handleMapType}
            >
                {mapType === "roadmap" ? <MapIcon /> : <SatelliteAltIcon />}
            </IconButton>

            <IconButton
                className="map-controls__icon"
                onClick={toggle}
            >
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
        </div>
    );
}