import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
    MessageDialog,
} from "../../../components";

import {
    useDocument,
    useCountdown,
    useMessageDialog,
} from "../../../hooks";

import { BookingService } from "../../../services";

import { getErrorMessage } from "../../../utils";

import { BOOKING_PAYMENT_DETAILS, USER } from "../../../constants";

export const BookingPaymentPage = () => {
    const [isPaying, setIsPaying] = useState(false);
    const [isCancel, setIsCancel] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: booking, isLoading, error
    } = useDocument("bookings", id);

    const {
        remainingTimeFormatted,
        isExpired
    } = useCountdown(booking?.expiresAt)

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const handlePay = async () => {
        try {
            setIsPaying(true);

            await BookingService.confirm(id);

            navigate(USER.bookingConfirm(id));
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsPaying(false);
        }
    }

    const handleCancel = async () => {
        try {
            setIsCancel(true);

            await BookingService.cancel(id);

            navigate(USER.MAP);
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsCancel(false);
        }
    }

    return (
        <Loader isLoading={isLoading || isPaying || isCancel} error={error}>
            <div className="page page__content">
                <span className="page__title">Оплата бронювання</span>

                <div className="page__label">
                    Залишилось на оплату: {remainingTimeFormatted}
                </div>

                <Details
                    data={booking}
                    details={BOOKING_PAYMENT_DETAILS}
                />

                <div className="page__buttons">
                    {isExpired ? (
                        <AppButton
                            type="button"
                            label="Карта"
                            onClick={() => navigate(USER.MAP)}
                        />
                    ) : (
                        <>
                            <AppButton
                                type="button"
                                label="Оплатити"
                                onClick={handlePay}
                                disabled={isLoading || isPaying}
                            />

                            <AppButton
                                type="button"
                                label="Скасувати"
                                onClick={handleCancel}
                                disabled={isLoading || isCancel}
                            />
                        </>
                    )}
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