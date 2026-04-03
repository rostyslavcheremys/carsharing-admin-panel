import { Actions, Loader, DataTable } from "../../../components";

import { useCollection, useTableColumns } from "../../../hooks";

import { BOOKINGS_TABLE_COLUMNS, BOOKING_ACTIONS } from "../../../constants";

export const BookingsManagementPage = () => {
    const {
        data: bookings,
        isLoading,
        error,
    } = useCollection("bookings");

    const columns = useTableColumns(BOOKINGS_TABLE_COLUMNS, {
        actions: (booking) => (
            <Actions
                id={booking?.id}
                actions={BOOKING_ACTIONS}
            />
        ),
    });

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування бронюваннями</span>

                <DataTable rows={bookings} columns={columns} />
            </div>
        </Loader>
    );
}