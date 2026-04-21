import { useState, useRef } from "react";

import {
    Loader,
    MapFilters,
    MapStepper,
    MapItem,
    MapControls,
    MessageDialog,
} from "../../components";

import {
    useMapState,
    useGoogleMapsLoader,
    useFilteredCars,
    useActiveIndex,
    useMapCenter,
    useMessageDialog,
    useNearestCar
} from "../../hooks";

import { MAP_FILTERS_DEFAULT_VALUES } from "../../constants";

export const Map = ({
                        cars = [],
                        activeCarId,
                        userMode = false
}) => {
    const mapRef = useRef(null);
    const wrapperRef = useRef(null);

    const [filters, setFilters] = useState(MAP_FILTERS_DEFAULT_VALUES);

    const { zoom, setZoom, mapType, setMapType } = useMapState();

    const { isLoaded } = useGoogleMapsLoader();

    const filteredCars = useFilteredCars(cars, filters);

    const {
        index: activeIndex,
        setIndex,
        prev,
        next,
        reset,
    } = useActiveIndex(filteredCars.length);

    const mapCenter = useMapCenter(filteredCars[activeIndex]);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const findNearestCar = useNearestCar(filteredCars, setIndex, mapRef, showMessage);

    const hasCars = filteredCars.length > 0;

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        reset();
    }

    return(
        <Loader isLoading={!isLoaded}>
            <div className="map-container" ref={wrapperRef}>
                <MapFilters
                    filters={filters}
                    onChange={handleFilterChange}
                    userMode={userMode}
                />

                {hasCars && (
                    <MapStepper
                        current={activeIndex + 1}
                        total={filteredCars.length}
                        onPrev={prev}
                        onNext={next}
                    />
                )}

                <MapItem
                    locations={filteredCars}
                    className="page"
                    zoom={zoom}
                    mapType={mapType}
                    mapCenter={mapCenter}
                    mapRef={mapRef}
                    isLoaded={isLoaded}
                    activeIndex={activeIndex}
                    activeCarId={activeCarId}
                    mapCard
                />

                <MapControls
                    zoom={zoom}
                    setZoom={setZoom}
                    mapType={mapType}
                    setMapType={setMapType}
                    mapRef={mapRef}
                    wrapperRef={wrapperRef}
                    onFindNearest={findNearestCar}
                    canCenter={hasCars}
                    mapCenter={mapCenter}
                />

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}