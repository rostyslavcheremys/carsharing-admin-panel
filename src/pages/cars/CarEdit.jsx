import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

import { Loader, CarForm, MessageDialog } from "../../components/index.js";

import {useMessageDialog, useDocument } from "../../hooks/index.js";

import { updateCar } from "../../services/index.js";

import { getErrorMessage, getCarValues } from "../../utils/index.js";

import { CAR_FORM_DEFAULT_VALUES } from "../../constants/index.js";

export const CarEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState([]);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: car, isLoading, error
    } = useDocument("cars", id, showMessage, navigate);

    const {
        control,
        handleSubmit,
        watch,
        reset
    } = useForm({
        defaultValues: CAR_FORM_DEFAULT_VALUES,
    });

    const powertrainType = watch("powertrainType");

    useEffect(() => {
        if (!car) return;

        setImages(car.images || []);
        reset(getCarValues(car));
    }, [car, reset]);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            await updateCar(id, data, images);

            showMessage(
                "Автомобіль оновлено!",
                () => navigate("/cars")
            );
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Loader isLoading={isLoading || isSubmitting} error={error}>
            <CarForm
                title="Редагування автомобіля"
                control={control}
                powertrainType={powertrainType}
                onSubmit={handleSubmit(onSubmit)}
                isSubmitting={isSubmitting}
                submitLabel="Зберегти"
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