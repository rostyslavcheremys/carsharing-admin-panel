import {
    Actions,
    Loader,
    DataTable,
    MessageDialog
} from "../../../components";

import {
    useCollection,
    useDelete,
    useTableColumns,
    useMessageDialog
} from "../../../hooks";

import { TripService } from "../../../services";

import { TRIPS_TABLE_COLUMNS, TRIPS_ACTIONS } from "../../../constants";

export const TripsManagementPage = () => {
    const {
        data: trips,
        isLoading,
        error,
    } = useCollection("trips");

    const { isDeleting, handleDelete } = useDelete(TripService.delete);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const columns = useTableColumns(TRIPS_TABLE_COLUMNS, {
        actions: (trip) => (
            <Actions
                id={trip?.id}
                actions={TRIPS_ACTIONS(handleDelete, showMessage)}
            />
        ),
    });

    return (
        <Loader isLoading={isLoading || isDeleting} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування поїздками</span>

                <DataTable rows={trips} columns={columns} />

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}