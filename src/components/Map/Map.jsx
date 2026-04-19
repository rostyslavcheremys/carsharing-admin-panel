import { useState, useRef } from "react";

import {
    Loader,
    MapFilters,
    MapStepper,
    MapItem,
    MapControls
} from "../../components";

import {
    useMapState,
    useGoogleMapsLoader,
    useFilteredCars,
    useActiveIndex,
    useMapCenter,
} from "../../hooks";

import { MAP_FILTERS_DEFAULT_VALUES } from "../../constants";

export const Map = ({ cars = [], activeCarId, userMode = false  }) => {
    const mapRef = useRef(null);
    const wrapperRef = useRef(null);

    const [filters, setFilters] = useState(MAP_FILTERS_DEFAULT_VALUES);

    const { zoom, setZoom, mapType, setMapType } = useMapState();

    const { isLoaded } = useGoogleMapsLoader();

    const filteredCars = useFilteredCars(cars, filters);

    const {
        index: activeIndex,
        prev,
        next,
        reset,
    } = useActiveIndex(filteredCars.length);

    const mapCenter = useMapCenter(filteredCars[activeIndex] || null);

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
                    canCenter={hasCars}
                    mapCenter={mapCenter}
                    mapRef={mapRef}
                    wrapperRef={wrapperRef}
                />
            </div>
        </Loader>
    );
}