import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
    MessageDialog, InfoMessage,
} from "../../../components";

import {
    useDocument,
    useMessageDialog,
} from "../../../hooks";

import { TripService } from "../../../services";

import { getErrorMessage } from "../../../utils";

import {
    TRIP_PAYMENT_MESSAGES,
    TRIP_PAYMENT_DETAILS,
    USER
} from "../../../constants";

export const TripPaymentPage = () => {
    const [isPaying, setIsPaying] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: trip, isLoading, error
    } = useDocument("trips", id);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const handlePay = async () => {
        try {
            setIsPaying(true);

            await TripService.pay(trip?.id);

            navigate(USER.tripSummary(trip?.id));
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsPaying(false);
        }
    }

    return (
        <Loader isLoading={isLoading || isPaying} error={error}>
            <div className="page page__content">
                <span className="page__title">Оплата поїздки</span>

                <InfoMessage message={TRIP_PAYMENT_MESSAGES.INFO} />

                <Details
                    data={trip}
                    details={TRIP_PAYMENT_DETAILS}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Оплатити"
                        onClick={handlePay}
                        disabled={isLoading || isPaying}
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