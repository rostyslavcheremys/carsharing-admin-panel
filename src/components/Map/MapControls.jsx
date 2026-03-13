import { useCallback } from "react";

import {
    AddIcon,
    RemoveIcon,
    MapIcon,
    RoomIcon,
    SatelliteAltIcon,
    FullscreenIcon,
    FullscreenExitIcon
} from "../../libs/mui-icons";

import { ActionIconButton } from "../../components";

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
            <ActionIconButton
                Icon={RoomIcon}
                onClick={handleCenterMarker}
                className="map__icon"
            />

            <ActionIconButton
                Icon={AddIcon}
                onClick={() => handleZoomChange(1)}
                className="map__icon"
                disabled={zoom >= MAX_ZOOM}
            />

            <ActionIconButton
                Icon={RemoveIcon}
                onClick={() => handleZoomChange(-1)}
                className="map__icon"
                disabled={zoom <= MIN_ZOOM}
            />

            <ActionIconButton
                Icon={mapType === "roadmap" ? MapIcon : SatelliteAltIcon}
                onClick={handleMapType}
                className="map__icon"
            />

            <ActionIconButton
                Icon={isFullscreen ? FullscreenExitIcon : FullscreenIcon}
                onClick={toggle}
                className="map__icon"
            />
        </div>
    );
}