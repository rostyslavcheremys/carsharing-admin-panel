import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    Details,
    AppButton,
    MessageDialog
} from "../../../components";

import { useMessageDialog, useDocument } from "../../../hooks";

import { CAR_CONDITION_DETAILS } from "../../../constants";

export const CarConditionDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: carCondition, isLoading, error
    } = useDocument("carCondition", id, showMessage, navigate);

    console.log(carCondition);

    const images = useMemo(() => {
        if (!carCondition?.images) return [];
        return Array.isArray(carCondition.images) ? carCondition.images : [carCondition.images];
    }, [carCondition]);

    if (!carCondition) return null;

    return(
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Стан автомобіля</span>

                {images.length > 0 && <CarImages images={images} />}

                <Details data={carCondition} details={CAR_CONDITION_DETAILS} />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoading || messageOpen}
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
}