import { useState } from "react";

import { useForm } from "react-hook-form";

import {
    Loader,
    AppButton,
    FileUploadController,
    InputController,
    SelectController,
    MessageDialog
} from "../components";

import { useMessageDialog } from "../hooks";

import { createCar } from "../services";

import { } from "../utils";

import {
    BODY_TYPES,
    COLORS,
    DRIVE_TYPES,
    FUEL_TYPES,
    POWERTRAIN_TYPES,
    STATUS,
    TRANSMISSION_TYPES,
    CAR_FORM_DEFAULT_VALUES,
} from "../constants";

export const CarForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const {
        control,
        handleSubmit,
        watch,
        reset
    } = useForm({
        defaultValues: CAR_FORM_DEFAULT_VALUES,
        mode: "onChange"
    });

    const powertrainType = watch("powertrainType");

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await createCar(data);

            showMessage("Авто успішно створено!");
            reset();
        } catch (error) {
            showMessage("Помилка: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Loader isLoading={isLoading}>
            <div className="page">
                <span className="page__title">CAR</span>

                <form className="page__form" onSubmit={handleSubmit(onSubmit)}>
                    <FileUploadController
                        control={control}
                        name="images"
                        label="Фотографії"
                    />

                    <SelectController
                        control={control}
                        name="status"
                        label="Статус*"
                        options={STATUS}
                    />

                    <InputController
                        control={control}
                        name="brand"
                        label="Марка*"
                    />

                    <InputController
                        control={control}
                        name="model"
                        label="Модель*"
                    />

                    <InputController
                        control={control}
                        name="year"
                        label="Рік випуску*"
                    />

                    <InputController
                        control={control}
                        name="carNumber"
                        label="Номер авто*"
                        /*rules={}*/
                    />

                    <SelectController
                        control={control}
                        name="transmissionType"
                        label="Коробка передач*"
                        options={TRANSMISSION_TYPES}
                    />

                    <InputController
                        control={control}
                        name="mileage"
                        label="Пробіг (км)*"
                    />

                    <InputController
                        control={control}
                        name="pricePerDay"
                        label="Вартість за добу (грн)*"
                    />

                    <SelectController
                        control={control}
                        name="powertrainType"
                        label="Тип двигуна*"
                        options={POWERTRAIN_TYPES}
                    />

                    {['petrol', 'diesel', 'hybrid'].includes(powertrainType) && (
                        <>
                            <InputController
                                control={control}
                                name="displacement"
                                label="Об'єм двигуна (л)*"
                            />
                        </>
                    )}

                    {['hybrid'].includes(powertrainType) && (
                        <SelectController
                            control={control}
                            name="fuelType"
                            label="Тип палива*"
                            options={FUEL_TYPES}
                        />
                    )}

                    {['electric', 'hybrid'].includes(powertrainType) && (
                        <>
                            <InputController
                                control={control}
                                name="capacity"
                                label="Ємність батареї (кВт·год)*"
                            />
                            <InputController
                                control={control}
                                name="range"
                                label="Запас ходу (км)*"
                            />
                        </>
                    )}

                    <SelectController
                        control={control}
                        name="bodyType"
                        label="Тип кузова*"
                        options={BODY_TYPES}
                    />

                    <SelectController
                        control={control}
                        name="driveType"
                        label="Привід*"
                        options={DRIVE_TYPES}
                    />

                    <SelectController
                        control={control}
                        name="color"
                        label="Колір*"
                        options={COLORS}
                    />

                    <InputController
                        control={control}
                        name="seats"
                        label="Кількість місць*"
                    />

                    <InputController
                        control={control}
                        name="latitude"
                        label="Широта (lat)"
                    />

                    <InputController
                        control={control}
                        name="longitude"
                        label="Довгота (lng)"
                    />

                    <div className="page__buttons">
                        <AppButton
                            type="submit"
                            label="Додати"
                            disabled={isLoading}
                        />
                    </div>
                </form>

                <MessageDialog
                    open={messageOpen}
                    handleClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
};