import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Loader, CarForm, MessageDialog } from "../../../components";

import { useMessageDialog } from "../../../hooks";

import { CarService } from "../../../services";

import { getErrorMessage } from "../../../utils";

import {
    CAR_FORM_DEFAULT_VALUES,
    CAR_ACTION_MESSAGES,
    ADMIN
} from "../../../constants";

export const CarCreatePage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        control,
        handleSubmit,
        watch,
        reset
    } = useForm({
        defaultValues: CAR_FORM_DEFAULT_VALUES,
    });

    const powertrainType = watch("powertrainType");

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            await CarService.createCar(data);

            showMessage(
                CAR_ACTION_MESSAGES.CREATE_SUCCESS,
                () => navigate(ADMIN.CARS)
            );

            reset(CAR_FORM_DEFAULT_VALUES);
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Loader isLoading={isSubmitting}>
            <CarForm
                title="Додавання автомобіля"
                control={control}
                powertrainType={powertrainType}
                onSubmit={handleSubmit(onSubmit)}
                isSubmitting={isSubmitting}
                submitLabel="Додати"
                showBack
                messageOpen={messageOpen}
                onBack={() => navigate(-1)}
            />

            <MessageDialog
                open={messageOpen}
                onClose={handleMessageClose}
                message={message}
            />
        </Loader>
    );
}