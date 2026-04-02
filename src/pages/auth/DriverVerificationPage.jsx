import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth, useMessageDialog } from "../../hooks";

import {
    Loader,
    InfoMessage,
    DiiaButton,
    MessageDialog
} from "../../components";

import { UserService } from "../../services";

import { getErrorMessage } from "../../utils";

import { DRIVER_VERIFICATION_MESSAGES, USER } from "../../constants";

export const DriverVerificationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const { user, setUser, loading, error } = useAuth();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const handleVerify = async () => {
        if (!user?.id) {
            return showMessage(DRIVER_VERIFICATION_MESSAGES.USER_NOT_FOUND);
        }

        setIsLoading(true);

        try {
            await UserService.approveUser(user?.id);

            setIsSuccess(true);
            showMessage(DRIVER_VERIFICATION_MESSAGES.SUCCESS);
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = async () => {
        handleMessageClose();

        if (!isSuccess || !user?.id) return;

        const updatedUser = await UserService.getUser(user?.id);
        setUser(updatedUser);

        navigate(USER.HOME, { replace: true });
    }

    return (
        <Loader isLoading={isLoading || loading} error={error}>
            <div className="page page__content">
                <span className="page__title">Верифікація водія</span>

                <InfoMessage message={DRIVER_VERIFICATION_MESSAGES.INFO} />

                <DiiaButton
                    onClick={handleVerify}
                    disabled={isLoading || loading || messageOpen}
                />

                <MessageDialog
                    open={messageOpen}
                    onClose={handleClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}