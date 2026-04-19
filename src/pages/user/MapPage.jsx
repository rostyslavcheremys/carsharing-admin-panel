import { Loader, Map } from "../../components";

import {
    useCollection,
    useActiveBooking,
    useAvailableCars,
} from "../../hooks";

export const MapPage = () => {
    const {
        data: cars,
        isLoading,
        error,
    } = useCollection("cars");

    const {
        activeCarId,
        loading: loadingBooking,
        error: errorBooking,
    } = useActiveBooking();

    const filteredCars = useAvailableCars(cars, activeCarId);

    return (
        <Loader isLoading={isLoading || loadingBooking} error={error || errorBooking}>
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