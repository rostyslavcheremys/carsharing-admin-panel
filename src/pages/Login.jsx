import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
    Loader,
    InputController,
    AppButton,
    MessageDialog,
} from "../components";

import { useMessageDialog } from "../hooks";

import {
    getEmailValidation,
    getPasswordValidation,
    getAuthErrorMessage,
} from "../utils";

import { login } from "../services/authService";

export const Login = () => {
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

    const onSubmitLogin = async (data) => {
        try {
            setIsLoading(true);

            await login(data.email, data.password);

            navigate("/cars", { replace: true });
        } catch (err) {
            showMessage(getAuthErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Loader isLoading={isLoading}>
            <div className="page">
                <span className="page__title">Адміністративна панель</span>

                <form className="page__form" onSubmit={handleSubmit(onSubmitLogin)}>
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
                    handleClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
};
