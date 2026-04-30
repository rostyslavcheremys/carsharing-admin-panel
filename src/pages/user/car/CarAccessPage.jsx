import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Loader,
    CarAccessButton,
    AppButton,
    MessageDialog,
} from "../../../components";

import {
    useTripCar,
    useMessageDialog
} from "../../../hooks";

import { CarService } from "../../../services";

import { getErrorMessage } from "../../../utils";

export const CarAccessPage = () => {
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {
        entity: car,
        loading: carLoading,
        error: carError,
        refetch
    } = useTripCar();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const isLocked = car?.isLocked;

    console.log(isLocked)

    const handleToggle = async () => {
        try {
            setLoading(true);

            await (isLocked ? CarService.unlock(car.id) : CarService.lock(car.id));

            await refetch();
        } catch (error) {
            showMessage(getErrorMessage(error))
        } finally {
            setLoading(false);
        }
    }

    return (
        <Loader isLoading={isLoading || carLoading} error={carError}>
            <div className="page page__content">
                <span className="page__title">
                    Автомобіль {isLocked ? "Заблоковано" : "Розблоковано"}
                </span>

                <CarAccessButton
                    isLocked={isLocked}
                    onClick={handleToggle}
                    loading={isLoading || carLoading}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoading}
                    />
                </div>

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
};