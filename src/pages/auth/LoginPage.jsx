import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Loader,
    InputController,
    AppButton,
    AuthRedirect,
    MessageDialog,
} from "../../components";

import { useMessageDialog } from "../../hooks";

import {
    getErrorMessage,
    getEmailValidation,
    getPasswordValidation,
} from "../../utils";

import { AuthService } from "../../services";

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

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
                            label="Увійти"
                            disabled={isLoading}
                        />
                    </div>

                    <AuthRedirect
                        text="Немає акаунта?"
                        linkText="Зареєструватися"
                        to="/auth/register"
                    />
                </form>

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}
