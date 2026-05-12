import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
    Loader,
    Details,
    RatingController,
    AppButton,
    MessageDialog,
} from "../../../components";

import {
    useDocument,
    useAuth,
    useMessageDialog
} from "../../../hooks";

import { TripService } from "../../../services";

import {
    getCarName,
    getFullName,
    getTripDuration,
    getErrorMessage
} from "../../../utils";

import {
    TRIP_ACTION_MESSAGES,
    TRIP_SUMMARY_DETAILS,
    USER
} from "../../../constants";

export const TripSummaryPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: trip,
        loading: tripLoading,
        error: tripError,
    } = useDocument("trips", id);

    const {
        document: car,
        loading: carLoading,
        error: carError,
    } = useDocument("cars", trip?.carId);

    const {
        user,
        loading: userLoading,
        error: userError,
    } = useAuth();

    const {
        control,
        handleSubmit,
    } = useForm({
        defaultValues: { rating: 0 }
    });

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            await TripService.setRating(trip.id, data.rating);

            showMessage(
                TRIP_ACTION_MESSAGES.RATING_SUCCESS,
                () => navigate(USER.HOME)
            );
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }

    const hasRating = trip?.rating != null;

    return (
        <Loader
            isLoading={isSubmitting || tripLoading || carLoading || userLoading}
            error={tripError || carError || userError}
        >
            <div className="page page__content">
                <span className="page__title">Поїздка завершена</span>

                <Details
                    data={{
                        ...trip,
                        car: getCarName(car),
                        fullName: getFullName(user),
                        duration: getTripDuration(trip?.actualStart, trip?.actualEnd),
                    }}
                    details={TRIP_SUMMARY_DETAILS}
                />

                {!hasRating && (
                    <>
                        <RatingController
                            control={control}
                            name="rating"
                            label="Оцініть поїздку"
                        />

                        <AppButton
                            type="button"
                            label="Оцінити"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting || tripLoading || carLoading || userLoading}
                        />
                    </>
                )}

                {hasRating && (
                    <>
                        <div className="page__label">
                            {TRIP_ACTION_MESSAGES.RATING_SUCCESS}
                        </div>

                        <div className="page__button">
                            <AppButton
                                type="button"
                                label="На головну"
                                onClick={() => navigate(USER.HOME)}
                            />
                        </div>
                    </>
                )}

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}