import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth, useMessageDialog } from "../../hooks";

import { DiiaButton, Loader, MessageDialog } from "../../components";

import { UserService } from "../../services";

import { getErrorMessage } from "../../utils";

export const DriverVerificationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    const { messageOpen, message, showMessage, handleMessageClose } = useMessageDialog();

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

        navigate("/", { replace: true });
    }

    return (
        <Loader isLoading={isLoading}>
            <div className="page page__content">
                <span className="page__title">Верифікація водія</span>

                <div className="page__info">
                    <p className="page__text">
                        Для користування всіма функціями сервісу необхідно підтвердити свій статус водія.
                        Натисніть на емблему «Дія», щоб надіслати цифрову копію вашого водійського посвідчення.
                        Це дозволяє автоматично перевірити ваші дані та надати повний доступ до сервісу.
                    </p>
                </div>

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