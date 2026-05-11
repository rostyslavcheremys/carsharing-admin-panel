import { Actions, Loader, DataTable } from "../../../components";

import {
    useAuth,
    useCollection,
    useCarsMap,
    useTableColumns
} from "../../../hooks";


import {
    TRIP_HISTORY_ACTIONS,
    TRIP_HISTORY_TABLE_COLUMNS
} from "../../../constants";

export const TripHistoryPage = () => {
    const { user } = useAuth();

    const {
        data: trips,
        isLoadingTrips,
        errorTrips
    } = useCollection("trips", {
        where: user?.id ? ["userId", "==", user.id] : null
    });

    const {
        carsMap,
        isLoading: isLoadingCars,
        error: errorCars,
    } = useCarsMap();

    const columns = useTableColumns(TRIP_HISTORY_TABLE_COLUMNS(carsMap), {
        actions: (trip) => (
            <Actions
                id={trip?.id}
                actions={TRIP_HISTORY_ACTIONS}
            />
        ),
    });

    return (
        <Loader
            isLoading={isLoadingTrips || isLoadingCars}
            error={errorTrips || errorCars}
        >
            <div className="page page__content">
                <span className="page__title">Історія поїздок</span>

                <DataTable
                    rows={trips}
                    columns={columns}
                />
            </div>
        </Loader>
    );
}