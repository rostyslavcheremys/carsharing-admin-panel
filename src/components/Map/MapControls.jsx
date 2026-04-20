import {
    AddIcon,
    RemoveIcon,
    MapIcon,
    RoomIcon,
    MyLocationIcon,
    SatelliteAltIcon,
    FullscreenIcon,
    FullscreenExitIcon
} from "../../libs/mui-icons";

import { ActionIconButton } from "../../components";

import {
    useMapZoom,
    useFullscreen,
    useMapType,
    useMapCenterAction
} from "../../hooks";

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
                                mapRef,
                                wrapperRef,
                                onFindNearest,
                                mapCenter,
                                canCenter
                            }) => {
    const { increase, decrease } = useMapZoom(zoom, setZoom);

    const {
        isFullscreen,
        toggle: toggleFullscreen
    } = useFullscreen(wrapperRef);

    const {
        mapType: currentMapType,
        toggle: toggleMapType
    } = useMapType(mapType, setMapType, MAP_TYPES);

    const { centerMap } = useMapCenterAction({ mapRef, canCenter });

    return(
        <div className="map-controls">
            {onFindNearest ? (
                <ActionIconButton
                    className="map__icon"
                    title="Найближчий автомобіль"
                    placement="left"
                    Icon={MyLocationIcon}
                    onClick={onFindNearest}
                />
            ) : (
                <ActionIconButton
                    className="map__icon"
                    title="Центрувати карту"
                    placement="left"
                    Icon={RoomIcon}
                    onClick={() => centerMap(mapCenter)}
                />
            )}

            <ActionIconButton
                className="map__icon"
                title="Збільшити"
                placement={"left"}
                Icon={AddIcon}
                onClick={increase}
                disabled={zoom >= MAX_ZOOM}
            />

            <ActionIconButton
                className="map__icon"
                title="Зменшити"
                placement={"left"}
                Icon={RemoveIcon}
                onClick={decrease}
                disabled={zoom <= MIN_ZOOM}
            />

            <ActionIconButton
                className="map__icon"
                title={currentMapType === "roadmap" ? "Супутник" : "Карта"}
                placement={"left"}
                Icon={currentMapType === "roadmap" ? MapIcon : SatelliteAltIcon}
                onClick={toggleMapType}
            />

            <ActionIconButton
                className="map__icon"
                title={isFullscreen ? "Згорнути" : "На весь екран"}
                placement={"left"}
                Icon={isFullscreen ? FullscreenExitIcon : FullscreenIcon}
                onClick={toggleFullscreen}
            />
        </div>
    );
}