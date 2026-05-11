import { Actions, Loader, DataTable } from "../../../components";

import {
    useUserCollection,
    useCarsMap,
    useTableColumns,
} from "../../../hooks";

import {
    BOOKING_HISTORY_ACTIONS,
    BOOKING_HISTORY_TABLE_COLUMNS,
} from "../../../constants";

export const BookingHistoryPage = () => {
    const {
        data: bookings,
        isLoadingBookings,
        errorBookings,
    } = useUserCollection("bookings");

    const {
        carsMap,
        isLoading: isLoadingCars,
        error: errorCars,
    } = useCarsMap();

    const columns = useTableColumns(BOOKING_HISTORY_TABLE_COLUMNS(carsMap), {
        actions: (booking) => (
            <Actions
                id={booking?.id}
                actions={BOOKING_HISTORY_ACTIONS}
            />
        ),
    });

    return (
        <Loader
            isLoading={isLoadingBookings || isLoadingCars}
            error={errorBookings || errorCars}
        >
            <div className="page page__content">
                <span className="page__title">Історія бронювань</span>

                <DataTable
                    rows={bookings}
                    columns={columns}
                />
            </div>
        </Loader>
    );
}