import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

import { Loader, CarForm, MessageDialog } from "../../../components";

import { useMessageDialog, useDocument } from "../../../hooks";

import { CarService } from "../../../services";

import { getErrorMessage, getCarValues } from "../../../utils";

import {
    CAR_FORM_DEFAULT_VALUES,
    CAR_ACTION_MESSAGES,
} from "../../../constants";

export const CarEditPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: car, isLoading, error
    } = useDocument("cars", id);

    const {
        control,
        handleSubmit,
        watch,
        reset
    } = useForm({
        defaultValues: CAR_FORM_DEFAULT_VALUES,
        mode: "onChange",
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

            await CarService.update(id, data, images);

            showMessage(
                CAR_ACTION_MESSAGES.EDIT_SUCCESS,
                () => navigate(-1)
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
                showBack
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