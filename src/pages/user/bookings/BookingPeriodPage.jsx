import { useState, useMemo } from "react";
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
    useDocument,
    useMessageDialog
} from "../../../hooks";

import { BookingService } from "../../../services";

import {
    calculateBookingDays,
    getErrorMessage,
    getPlannedStartValidation,
    getPlannedEndValidation,
} from "../../../utils";

import {
    USER,
    BOOKING_FORM_DEFAULT_VALUES,
    BOOKING_PERIOD_DETAILS
} from "../../../constants";

export const BookingPeriodPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: car, isLoading, error
    } = useDocument("cars", id);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const {
        control,
        handleSubmit
    } = useForm({
        defaultValues: BOOKING_FORM_DEFAULT_VALUES,
        mode: "onChange",
    });

    const plannedStart = useWatch({
        control, name: "plannedStart",
    });

    const plannedEnd = useWatch({
        control, name: "plannedEnd",
    });

    const pricePerDay = car?.pricePerDay;

    const days = useMemo(() => {
        return calculateBookingDays(plannedStart, plannedEnd);
    }, [plannedStart, plannedEnd]);

    const totalPrice = useMemo(() => {
        return days * pricePerDay;
    }, [days, pricePerDay]);

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
        <Loader isLoading={isLoading || isSubmitting} error={error}>
            <div className="page page__content">
                <form className="page__form" onSubmit={handleSubmit(onSubmit)}>
                    <span className="page__title form">Період бронювання</span>

                    <DateTimeController
                        control={control}
                        name="plannedStart"
                        label="Початок*"
                        rules={getPlannedStartValidation()}
                    />

                    <DateTimeController
                        control={control}
                        name="plannedEnd"
                        label="Завершення*"
                        rules={getPlannedEndValidation(plannedStart)}
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
                            disabled={isLoading || messageOpen}
                        />

                        <AppButton
                            type="button"
                            label="Назад"
                            onClick={() => navigate(-1)}
                            disabled={isLoading || messageOpen}
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