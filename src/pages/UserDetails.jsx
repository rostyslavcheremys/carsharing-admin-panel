import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
    MessageDialog,
} from "../components";

import { useMessageDialog, useDocument } from "../hooks";

import { USER_DETAILS } from "../constants";

export const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: user, isLoading, error
    } = useDocument("users", id, showMessage, navigate);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Користувач</span>

                <Details data={user} details={USER_DETAILS} />

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
