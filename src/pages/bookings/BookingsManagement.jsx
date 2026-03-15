import { Actions, DataTable, Loader } from "../../components";

import { useCollection, useTableColumns } from "../../hooks";

import { getActionMessage } from "../../utils";

import { BOOKINGS_TABLE_COLUMNS, BOOKING_ACTIONS } from "../../constants";

export const BookingsManagement = () => {
    const {
        data: bookings,
        isLoading,
        error,
    } = useCollection("bookings");

    console.log(bookings);

    const columns = useTableColumns(BOOKINGS_TABLE_COLUMNS, {
        actions: (booking) => (
            <Actions
                id={booking.id}
                actions={BOOKING_ACTIONS}
                getMessage={getActionMessage}
                entity="booking"
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