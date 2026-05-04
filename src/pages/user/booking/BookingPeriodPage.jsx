import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    DateTimeController,
    Details,
    AppButton,
    MessageDialog,
} from "../../../components";

import {
    useCollection,
    useDocument,
    useMessageDialog,
    useBookingPeriod
} from "../../../hooks";

import { BookingService } from "../../../services";

import {
    getErrorMessage,
    getPlannedStartValidation,
    getPlannedEndValidation,
} from "../../../utils";

import {
    USER,
    BOOKING_FORM_DEFAULT_VALUES,
    BOOKING_PERIOD_DETAILS,
} from "../../../constants";

export const BookingPeriodPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        control,
        handleSubmit
    } = useForm({
        defaultValues: BOOKING_FORM_DEFAULT_VALUES,
        mode: "onChange",
    });

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: car, isLoading, error
    } = useDocument("cars", id);

    const {
        data: bookings,
        isLoading: bookingsLoading,
    } = useCollection("bookings");

    const plannedStart = useWatch({
        control, name: "plannedStart",
    });

    const plannedEnd = useWatch({
        control, name: "plannedEnd",
    });

    const pricePerDay = car?.pricePerDay;

    const {
        disabledRanges,
        days,
        totalPrice
    } = useBookingPeriod(
        bookings,
        id,
        plannedStart,
        plannedEnd,
        pricePerDay
    );

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            const booking = await BookingService.create({
                carId: id,
                price: totalPrice,
                plannedStart: data.plannedStart,
                plannedEnd: data.plannedEnd,
            });

            navigate(USER.bookingPayment(booking.id));
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Loader isLoading={isLoading || isSubmitting || bookingsLoading} error={error}>
            <div className="page page__content">
                <form className="page__form" onSubmit={handleSubmit(onSubmit)}>
                    <span className="page__title form">Період бронювання</span>

                    <DateTimeController
                        control={control}
                        name="plannedStart"
                        label="Початок*"
                        rules={getPlannedStartValidation()}
                        disabledRanges={disabledRanges}
                    />

                    <DateTimeController
                        control={control}
                        name="plannedEnd"
                        label="Завершення*"
                        rules={getPlannedEndValidation(plannedStart)}
                        disabledRanges={disabledRanges}
                    />

                    <Details
                        className="form__details"
                        data={{ days, pricePerDay, totalPrice }}
                        details={BOOKING_PERIOD_DETAILS}
                    />

                    <div className="page__buttons page__buttons--form">
                        <AppButton
                            type="submit"
                            label="Підтвердити"
                            disabled={isLoading}
                        />

                        <AppButton
                            type="button"
                            label="Назад"
                            onClick={() => navigate(-1)}
                            disabled={isLoading}
                        />
                    </div>
                </form>

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}