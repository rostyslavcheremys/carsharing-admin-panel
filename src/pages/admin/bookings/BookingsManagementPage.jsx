import { Actions, DataTable, Loader } from "../../../components/index.js";

import { useCollection, useTableColumns } from "../../../hooks/index.js";

import { getActionMessage } from "../../../utils/index.js";

import { BOOKINGS_TABLE_COLUMNS, BOOKING_ACTIONS } from "../../../constants/index.js";

export const BookingsManagementPage = () => {
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