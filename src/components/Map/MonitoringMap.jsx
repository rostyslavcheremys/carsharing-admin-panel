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

import { CAR_STATUS_FILTER } from "../../constants";

export const MonitoringMap = ({ cars = [] }) => {
    const mapRef = useRef(null);
    const wrapperRef = useRef(null);

    const { zoom, setZoom, mapType, setMapType } = useMapState();

    const [statusFilter, setStatusFilter] = useState([]);

    const { isLoaded } = useGoogleMapsLoader();

    const filteredCars = useFilteredCars(cars, statusFilter);

    const {
        index: activeIndex,
        prev,
        next,
        reset,
    } = useActiveIndex(filteredCars.length);

    const mapCenter = useMapCenter(filteredCars[activeIndex] || null);

    const hasCars = filteredCars.length > 0;

    const handleFilterChange = (newFilters) => {
        setStatusFilter(newFilters);
        reset();
    }

    return(
        <Loader isLoading={!isLoaded}>
            <div className="map-container" ref={wrapperRef}>
                <MapFilters
                    selectedStatus={statusFilter}
                    onChange={handleFilterChange}
                    buttons={CAR_STATUS_FILTER}
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
                    className="map page"
                    zoom={zoom}
                    mapType={mapType}
                    mapCenter={mapCenter}
                    mapRef={mapRef}
                    isLoaded={isLoaded}
                    activeIndex={activeIndex}
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