import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
    MessageDialog,
} from "../../../components";

import { useMessageDialog, useDocument } from "../../../hooks";

import { PROFILE_DETAILS, USER } from "../../../constants";

export const ProfileDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const {
        document: user, isLoading, error
    } = useDocument("users", id, showMessage, navigate);

    console.log(user);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Інформація профілю</span>

                <Details data={user} details={PROFILE_DETAILS} />

                <div className="page__buttons">
                    <AppButton
                        type="button"
                        label="Редагувати"
                        onClick={() => navigate(USER.profileEdit(user.id))}
                        disabled={isLoading || messageOpen}
                    />

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