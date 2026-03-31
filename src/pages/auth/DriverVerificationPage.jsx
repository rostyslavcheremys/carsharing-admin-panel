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

import { USER, DRIVER_VERIFICATION_MESSAGES } from "../../constants";

export const DriverVerificationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose
    } = useMessageDialog();

    const handleVerify = async () => {
        setIsLoading(true);

        try {
            await UserService.approveUser(user.id);

            setIsSuccess(true);
            showMessage("Верифікація успішна!");
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = async () => {
        handleMessageClose();

        if (!isSuccess) return;

        const updatedUser = await UserService.getUser(user.id);
        setUser(updatedUser);

        navigate(USER.HOME, { replace: true });
    }

    return (
        <Loader isLoading={isLoading}>
            <div className="page page__content">
                <span className="page__title">Верифікація водія</span>

                <InfoMessage message={DRIVER_VERIFICATION_MESSAGES} />

                <DiiaButton
                    onClick={handleVerify}
                    disabled={isLoading || messageOpen}
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