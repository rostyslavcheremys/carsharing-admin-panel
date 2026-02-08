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
        <div className="page">
            <span className="page__title form">{title}</span>

            <form className="page__form" onSubmit={onSubmit}>
                <FileUploadController
                    control={control}
                    name="images"
                    label="Фотографії*"
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
                    name="mileage"
                    label="Пробіг (км)*"
                />

                <InputController
                    control={control}
                    name="licensePlate"
                    label="Номерний знак*"
                />

                <SelectController
                    control={control}
                    name="bodyType"
                    label="Тип кузова*"
                    options={BODY_TYPES}
                />

                <SelectController
                    control={control}
                    name="powertrainType"
                    label="Тип двигуна*"
                    options={POWERTRAIN_TYPES}
                />

                {showEngineFields && (
                    <>
                        <SelectController
                            control={control}
                            name="fuelType"
                            label="Тип палива*"
                            options={FUEL_TYPES}
                        />
                        <InputController
                            control={control}
                            name="displacement"
                            label="Об'єм двигуна (л)*"
                        />
                    </>
                )}

                {showBatteryFields && (
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
                    name="transmissionType"
                    label="Коробка передач*"
                    options={TRANSMISSION_TYPES}
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
                    name="pricePerDay"
                    label="Вартість за добу (грн)*"
                />

                <LocationController
                    control={control}
                    name="location"
                    label="Місцезнаходження*"
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