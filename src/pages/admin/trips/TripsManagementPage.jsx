import { Actions, Loader, DataTable } from "../../../components";

import { useCollection, useTableColumns } from "../../../hooks";

import { TRIPS_TABLE_COLUMNS, TRIPS_ACTIONS } from "../../../constants";

export const TripsManagementPage = () => {
    const {
        data: trips,
        isLoading,
        error,
    } = useCollection("trips");

    const columns = useTableColumns(TRIPS_TABLE_COLUMNS, {
        actions: (trip) => (
            <Actions
                id={trip?.id}
                actions={TRIPS_ACTIONS}
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