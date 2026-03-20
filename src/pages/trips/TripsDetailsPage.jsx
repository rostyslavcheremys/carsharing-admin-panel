import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    DetailsMap,
    AppButton,
    MessageDialog,
} from "../../components";

import { useMessageDialog, useDocument } from "../../hooks";

import { getTripLocation } from "../../utils";

import { TRIP_DETAILS } from "../../constants";

export const TripsDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: trip, isLoading, error
    } = useDocument("trips", id, showMessage, navigate);

    const startLocation = getTripLocation(trip, "startLocation");
    const endLocation = getTripLocation(trip, "endLocation");

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Поїздка</span>

                <Details data={trip} details={TRIP_DETAILS} />

                <DetailsMap
                    label="Початкове місцезнаходження"
                    location={startLocation}
                />

                <DetailsMap
                    label="Кінцеве місцезнаходження"
                    location={endLocation}
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
}
