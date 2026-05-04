import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Loader,
    AppButton,
    MessageDialog,
} from "../../../components";

import {
    useActiveBooking,
    useActiveTrip,
    useCountdown,
    useMessageDialog
} from "../../../hooks";

import { TripService } from "../../../services";

import { getErrorMessage } from "../../../utils";

import { USER } from "../../../constants";

export const TripActivePage = () => {
    const [isEndingTrip, setIsEndingTrip] = useState(false);

    const navigate = useNavigate();

    const {
        entity: booking,
        loading: isLoadingBooking,
        error: errorBooking
    } = useActiveBooking();

    const {
        entity: trip,
        loading: isLoadingTrip,
        error: errorTrip,
    } = useActiveTrip();

    const { remainingTimeFormatted } = useCountdown(booking?.plannedEnd);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const handleEndTrip = async () => {
        try {
            setIsEndingTrip(true);

            const result = await TripService.end(trip?.id);

            navigate(
                result.hasAdditionalCharge
                    ? USER.tripPayment(trip?.id)
                    : USER.tripSummary(trip?.id)
            );
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsEndingTrip(false);
        }
    }

    const hasStartCondition = !!trip?.conditionStartId;
    const hasEndCondition = !!trip?.conditionEndId;
    const showConditionButton = !(hasStartCondition && hasEndCondition);

    return (
        <Loader
            isLoading={isLoadingBooking || isLoadingTrip || isEndingTrip}
            error={errorBooking || errorTrip}
        >
            <div className="page page__content">
                <span className="page__title">Активна поїздка</span>

                <div className="page__label">
                    До завершення: {remainingTimeFormatted}
                </div>

                <div className="page__buttons page__buttons--column">
                    <AppButton
                        type="button"
                        label="Керування замком"
                        className="app-button--size-lg"
                        onClick={() => navigate(USER.tripAccess(trip?.carId))}
                    />

                    {showConditionButton && (
                        <AppButton
                            type="button"
                            label={
                                hasStartCondition
                                    ? "Кінцева фотофіксація"
                                    : "Початкова фотофіксація"
                            }
                            className="app-button--size-lg"
                            onClick={() =>
                                navigate(
                                    hasStartCondition
                                        ? USER.tripConditionEnd(trip?.id)
                                        : USER.tripConditionStart(trip?.id)
                                )
                            }
                        />
                    )}

                    <AppButton
                        type="button"
                        label="Завершити поїздку"
                        className="app-button--size-lg"
                        onClick={handleEndTrip}
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
    )
}