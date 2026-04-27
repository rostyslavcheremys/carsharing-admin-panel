import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
    Loader,
    FileUploadController,
    AppButton,
    MessageDialog, TextController,
} from "../../../components";

import {
    useActiveTrip, useDocument,
    useMessageDialog
} from "../../../hooks";

import { CarConditionService } from "../../../services";

import {
    getErrorMessage,
    getRequiredAnyValidation,
    getMileageValidation,
    getPercentValidation,
} from "../../../utils";

import {
    CAR_CONDITION_FORM_DEFAULT_VALUES,
    CAR_CONDITION_ACTION_MESSAGES,
} from "../../../constants";

export const CarConditionsPage = ({ type }) => {
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    const {
        entity: trip,
        loading: isLoadingTrip,
        error: errorTrip,
    } = useActiveTrip();

    const {
        document: car, isLoading, error
    } = useDocument("cars", trip?.carId);

    const isIce = car?.powertrainType === "ice";
    const isElectric = car?.powertrainType === "electric";
    const isHybrid = car?.powertrainType === "hybrid";

    const showEngineFields = isIce || isHybrid;
    const showBatteryFields = isElectric || isHybrid;

    const {
        control,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: CAR_CONDITION_FORM_DEFAULT_VALUES,
        mode: "onChange",
    });

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const onSubmit = async (data) => {
        try {
            setIsSaving(true);

            await CarConditionService.save(
                {
                    trip,
                    data,
                    type
                }
            );

            showMessage(
                CAR_CONDITION_ACTION_MESSAGES.CREATE_SUCCESS,
                () => navigate(-1)
            );

            reset(CAR_CONDITION_FORM_DEFAULT_VALUES);
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Loader
            isLoading={isSaving || isLoadingTrip || isLoading}
            error={errorTrip || error}
        >
            <div className="page page__content">
                <form className="page__form" onSubmit={handleSubmit(onSubmit)}>
                    <span className="page__title">Фіксація стану автомобіля</span>

                    <FileUploadController
                        control={control}
                        name="images"
                        label="Фотографії*"
                        rules={getRequiredAnyValidation("Фотографії")}
                    />

                    <TextController
                        control={control}
                        name="description"
                        label="Опис*"
                        multiline
                        rows={4}
                        className="form__textarea"
                        rules={getRequiredAnyValidation("Опис")}
                    />

                    <TextController
                        control={control}
                        name="mileage"
                        label="Поточний пробіг (км)*"
                        rules={getMileageValidation()}
                    />

                    {showEngineFields && (
                        <TextController
                            control={control}
                            name="fuelPercent"
                            label="Рівень пального (%)*"
                            rules={getPercentValidation("Рівень пального")}
                        />
                    )}

                    {showBatteryFields && (
                        <TextController
                            control={control}
                            name="batteryPercent"
                            label="Рівень заряду батареї (%)*"
                            rules={getPercentValidation("Рівень заряду батареї")}
                        />
                    )}

                    <div className="page__buttons page__buttons--form">
                        <AppButton
                            type="submit"
                            label="Зберегти"
                            disabled={isSaving || messageOpen}
                        />

                        <AppButton
                            type="button"
                            label="Назад"
                            onClick={() => navigate(-1)}
                            disabled={isSaving || messageOpen}
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