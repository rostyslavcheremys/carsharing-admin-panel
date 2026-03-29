import { Actions, DataTable, Loader } from "../../../components/index.js";

import { useCollection, useTableColumns } from "../../../hooks/index.js";

import { getActionMessage } from "../../../utils/index.js";

import { TRIPS_TABLE_COLUMNS, TRIPS_ACTIONS } from "../../../constants/index.js";

export const TripsManagementPage = () => {
    const {
        data: trips,
        isLoading,
        error,
    } = useCollection("trips");

    console.log(trips);

    const columns = useTableColumns(TRIPS_TABLE_COLUMNS, {
        actions: (trip) => (
            <Actions
                id={trip.id}
                actions={TRIPS_ACTIONS}
                getMessage={getActionMessage}
                entity="trip"
            />
        ),
    });

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування поїздками</span>

                <DataTable rows={trips} columns={columns} />
            </div>
        </Loader>
    );
}