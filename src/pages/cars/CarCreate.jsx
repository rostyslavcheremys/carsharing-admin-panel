import { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Loader, CarForm, MessageDialog } from "../../components/index.js";

import { useMessageDialog } from "../../hooks/index.js";

import { createCar } from "../../services/index.js";

import { getErrorMessage } from "../../utils/index.js";

import { CAR_FORM_DEFAULT_VALUES } from "../../constants/index.js";

export const CarCreate = () => {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

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

            await createCar(data);

            showMessage(
                "Автомобіль додано!",
                () => navigate("/cars")
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
                showBack={true}
                onBack={() => navigate("/cars")}
            />

            <MessageDialog
                open={messageOpen}
                onClose={handleMessageClose}
                message={message}
            />
        </Loader>
    );
}