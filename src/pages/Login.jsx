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
    getErrorMessage,
    getEmailValidation,
    getPasswordValidation,
} from "../utils";

import { login } from "../services";

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

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await login(data.email, data.password);

            navigate("/cars", { replace: true });
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Loader isLoading={isLoading}>
            <div className="page">
                <span className="page__title form">Адміністративна панель</span>

                <form className="page__form" onSubmit={handleSubmit(onSubmit)}>
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

                    <div className="page__button">
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
