import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
    MessageDialog,
} from "../../components";

import { useMessageDialog, useDocument } from "../../hooks";

import { BOOKING_DETAILS } from "../../constants";

export const BookingDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: booking, isLoading, error
    } = useDocument("bookings", id, showMessage, navigate);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Бронювання</span>

                <Details data={booking} details={BOOKING_DETAILS} />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoading}
                    />
                </div>

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}
