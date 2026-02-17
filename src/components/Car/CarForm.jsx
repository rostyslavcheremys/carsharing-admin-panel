import {
    AppButton,
    FileUploadController,
    InputController,
    SelectController,
    LocationController
} from "../index.js";

import {
    BODY_TYPES,
    COLORS,
    DRIVE_TYPES,
    FUEL_TYPES,
    POWERTRAIN_TYPES,
    STATUS,
    TRANSMISSION_TYPES,
} from "../../constants";

import {
    getRequiredAnyValidation,
    getRequiredFieldValidation,
    getBrandValidation,
    getModelValidation,
    getYearValidation,
    getMileageValidation,
    getLicensePlateValidation,
    getDisplacementValidation,
    getCapacityValidation,
    getRangeValidation,
    getSeatsValidation,
    getPricePerDayValidation,
} from "../../utils";

export const CarForm = ({
                            title,
                            control,
                            powertrainType,
                            onSubmit,
                            isSubmitting,
                            submitLabel,
                            showBack,
                            onBack
                        }) => {
    const isIce = powertrainType === "ice";
    const isElectric = powertrainType === "electric";
    const isHybrid = powertrainType === "hybrid";

    const showEngineFields = isIce || isHybrid;
    const showBatteryFields = isElectric || isHybrid;

    return (
        <div className="page page__content">
            <span className="page__title form">{title}</span>

            <form className="page__form" onSubmit={onSubmit}>
                <FileUploadController
                    control={control}
                    name="images"
                    label="Фотографії*"
                    rules={getRequiredAnyValidation("Фотографії")}
                />

                <SelectController
                    control={control}
                    name="status"
                    label="Статус*"
                    options={STATUS}
                    rules={getRequiredFieldValidation("Статус")}
                />

                <InputController
                    control={control}
                    name="brand"
                    label="Марка*"
                    rules={getBrandValidation()}
                />

                <InputController
                    control={control}
                    name="model"
                    label="Модель*"
                    rules={getModelValidation()}
                />

                <InputController
                    control={control}
                    name="year"
                    label="Рік випуску*"
                    rules={getYearValidation()}
                />

                <InputController
                    control={control}
                    name="mileage"
                    label="Пробіг (км)*"
                    rules={getMileageValidation()}
                />

                <InputController
                    control={control}
                    name="licensePlate"
                    label="Номерний знак*"
                    rules={getLicensePlateValidation()}
                />

                <SelectController
                    control={control}
                    name="bodyType"
                    label="Тип кузова*"
                    options={BODY_TYPES}
                    rules={getRequiredFieldValidation("Тип кузова")}
                />

                <SelectController
                    control={control}
                    name="powertrainType"
                    label="Тип двигуна*"
                    options={POWERTRAIN_TYPES}
                    rules={getRequiredFieldValidation("Тип двигуна")}
                />

                {showEngineFields && (
                    <>
                        <SelectController
                            control={control}
                            name="fuelType"
                            label="Тип палива*"
                            options={FUEL_TYPES}
                            rules={getRequiredFieldValidation("Тип палива")}
                        />
                        <InputController
                            control={control}
                            name="displacement"
                            label="Об'єм двигуна (л)*"
                            rules={getDisplacementValidation()}
                        />
                    </>
                )}

                {showBatteryFields && (
                    <>
                        <InputController
                            control={control}
                            name="capacity"
                            label="Ємність батареї (кВт·год)*"
                            rules={getCapacityValidation()}
                        />
                        <InputController
                            control={control}
                            name="range"
                            label="Запас ходу (км)*"
                            rules={getRangeValidation()}
                        />
                    </>
                )}

                <SelectController
                    control={control}
                    name="transmissionType"
                    label="Коробка передач*"
                    options={TRANSMISSION_TYPES}
                    rules={getRequiredFieldValidation("Коробка передач")}
                />

                <SelectController
                    control={control}
                    name="driveType"
                    label="Тип приводу*"
                    options={DRIVE_TYPES}
                    rules={getRequiredFieldValidation("Тип приводу")}
                />

                <SelectController
                    control={control}
                    name="color"
                    label="Колір*"
                    options={COLORS}
                    rules={getRequiredFieldValidation("Колір")}
                />

                <InputController
                    control={control}
                    name="seats"
                    label="Кількість місць*"
                    rules={getSeatsValidation()}
                />

                <InputController
                    control={control}
                    name="pricePerDay"
                    label="Вартість за добу (грн)*"
                    rules={getPricePerDayValidation()}
                />

                <LocationController
                    control={control}
                    name="location"
                    label="Місцезнаходження*"
                    rules={getRequiredAnyValidation("Місцезнаходження")}
                />

                <div className="page__buttons">
                    <AppButton
                        type="submit"
                        label={submitLabel}
                        disabled={isSubmitting}
                    />

                    {showBack && (
                        <AppButton
                            type="button"
                            label="Назад"
                            onClick={onBack}
                            disabled={isSubmitting}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}