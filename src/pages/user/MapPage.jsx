import { Loader, Map } from "../../components";

import {
    useCollection,
    useActiveBooking,
    useAvailableCars
} from "../../hooks";

export const MapPage = () => {
    const {
        data: cars,
        isLoading,
        error,
    } = useCollection("cars");

    const {
        entity: booking,
        loading: isLoadingBooking,
        error: errorBooking,
    } = useActiveBooking();

    const activeCarId = booking?.carId;

    const filteredCars = useAvailableCars(cars, activeCarId);

    return (
        <Loader
            isLoading={isLoading || isLoadingBooking}
            error={error || errorBooking}
        >
            <div className="page">
                <Map
                    cars={filteredCars}
                    activeCarId={activeCarId}
                    userMode
                />
            </div>
        </Loader>
    );
}