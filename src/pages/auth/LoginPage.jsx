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

import { LOGIN_FORM_DEFAULT_VALUES, AUTH } from "../../constants";

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const { control, handleSubmit } = useForm({
        defaultValues: LOGIN_FORM_DEFAULT_VALUES,
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
            <div className="page page__content">
                <form className="page__form" onSubmit={handleSubmit(onSubmit)}>
                    <span className="page__title form">Вхід</span>

                    <InputController
                        control={control}
                        name="email"
                        label="Електронна адреса*"
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
                            disabled={isLoading || messageOpen}
                        />
                    </div>

                    <AuthRedirect
                        text="Немає акаунта?"
                        linkText="Зареєструватися"
                        to={AUTH.REGISTER}
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
