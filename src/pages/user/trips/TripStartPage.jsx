import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Loader,
    InfoMessage,
    AppButton,
    MessageDialog,
} from "../../../components";

import {
    useActiveBooking,
    useMessageDialog
} from "../../../hooks";

import { TripService } from "../../../services";

import { getErrorMessage } from "../../../utils";

import { TRIP_START_MESSAGES, USER } from "../../../constants";

export const TripStartPage = () => {
    const [isStartingTrip, setIsStartingTrip] = useState(false);

    const navigate = useNavigate();

    const {
        entity: booking,
        loading: isLoading,
        error
    } = useActiveBooking();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const handleStartTrip = async () => {
        try {
            setIsStartingTrip(true);

            const tripId = await TripService.start(booking);

            navigate(USER.tripActive(tripId));
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsStartingTrip(false);
        }
    }

    return (
        <Loader isLoading={isLoading || isStartingTrip} error={error}>
            <div className="page page__content">
                <span className="page__title">Початок поїздки</span>

                <InfoMessage message={TRIP_START_MESSAGES.INFO} />

                <div className="page__buttons page__buttons--column">
                    <AppButton
                        type="button"
                        label="Почати поїздку"
                        className="app-button--size-md"
                        onClick={handleStartTrip}
                    />

                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
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