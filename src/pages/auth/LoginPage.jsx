import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
    Loader,
    InputController,
    AppButton,
    MessageDialog,
} from "../../components/index.js";

import { useMessageDialog } from "../../hooks/index.js";

import {
    getErrorMessage,
    getEmailValidation,
    getPasswordValidation,
} from "../../utils/index.js";

import { AuthService } from "../../services/index.js";

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const navigate = useNavigate();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await AuthService.login(data.email, data.password);

            navigate("/cars", { replace: true });
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Loader isLoading={isLoading}>
            <div className="page">
                <form className="page__form" onSubmit={handleSubmit(onSubmit)}>
                    <span className="page__title form">Вхід</span>

                    <InputController
                        control={control}
                        name="email"
                        label="Електронна пошта*"
                        type="email"
                        rules={getEmailValidation()}
                    />

                    <InputController
                        control={control}
                        name="password"
                        label="Пароль*"
                        type="password"
                        rules={getPasswordValidation()}
                    />

                    <div className="page__buttons">
                        <AppButton
                            type="submit"
                            label="Вхід"
                            disabled={isLoading}
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
};
