import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Loader,
    CarImages,
    Details,
    AppButton,
    MessageDialog
} from "../../components";

import { useMessageDialog, useDocument } from "../../hooks";

import { CAR_STATE_DETAILS } from "../../constants";

export const CarStateDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: carState, isLoading, error
    } = useDocument("carState", id, showMessage, navigate);

    const images = useMemo(() => {
        if (!carState?.images) return [];
        return Array.isArray(carState.images) ? carState.images : [carState.images];
    }, [carState]);

    if (!carState) return null;

    return(
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Стан автомобіля</span>

                {images.length > 0 && <CarImages images={images} />}

                <Details data={carState} details={CAR_STATE_DETAILS} />

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