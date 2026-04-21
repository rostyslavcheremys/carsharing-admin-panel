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

import { BookingService } from "../../../services";

import { BOOKINGS_TABLE_COLUMNS, BOOKING_ACTIONS } from "../../../constants";

export const BookingsManagementPage = () => {
    const {
        data: bookings,
        isLoading,
        error,
    } = useCollection("bookings");

    const { isDeleting, handleDelete } = useDelete(BookingService.delete);

    const columns = useTableColumns(BOOKINGS_TABLE_COLUMNS, {
        actions: (booking) => (
            <Actions
                id={booking?.id}
                actions={BOOKING_ACTIONS(handleDelete, showMessage)}
            />
        ),
    });

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    return (
        <Loader isLoading={isLoading || isDeleting} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування бронюваннями</span>

                <DataTable rows={bookings} columns={columns} />

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}