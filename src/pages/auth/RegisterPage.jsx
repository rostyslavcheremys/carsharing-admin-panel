import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Loader,
    TextController,
    DateController,
    AppButton,
    AuthRedirect,
    MessageDialog,
} from "../../components";

import { useMessageDialog } from "../../hooks";

import { AuthService } from "../../services";

import {
    getErrorMessage,
    getFirstNameValidation,
    getLastNameValidation,
    getPhoneNumberValidation,
    getBirthDateValidation,
    getEmailValidation,
    getPasswordValidation,
    getConfirmPasswordValidation
} from "../../utils";

import { REGISTER_FORM_DEFAULT_VALUES, AUTH } from "../../constants";

export const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const {
        control,
        watch, handleSubmit
    } = useForm({
        defaultValues: REGISTER_FORM_DEFAULT_VALUES,
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            const { confirmPassword: _confirmPassword, ...userData } = data;
            await AuthService.register(userData);
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
                    <span className="page__title form">Реєстрація</span>

                    <TextController
                        control={control}
                        name="firstName"
                        label="Ім'я*"
                        rules={getFirstNameValidation()}
                    />

                    <TextController
                        control={control}
                        name="lastName"
                        label="Прізвище*"
                        rules={getLastNameValidation()}
                    />

                    <TextController
                        control={control}
                        name="phoneNumber"
                        label="Номер телефону*"
                        rules={getPhoneNumberValidation()}
                    />

                    <DateController
                        control={control}
                        name="birthDate"
                        label="Дата народження*"
                        rules={getBirthDateValidation()}
                    />

                    <TextController
                        control={control}
                        name="email"
                        label="Електронна адреса*"
                        type="email"
                        rules={getEmailValidation()}
                    />

                    <TextController
                        control={control}
                        name="password"
                        label="Пароль*"
                        type="password"
                        rules={getPasswordValidation()}
                    />

                    <TextController
                        control={control}
                        name="confirmPassword"
                        label="Підтвердження пароля*"
                        type="password"
                        rules={getConfirmPasswordValidation(() => watch("password"))}
                    />

                    <div className="page__button page__buttons--form">
                        <AppButton
                            type="submit"
                            className="app-button--size-md"
                            label="Зареєструватися"
                            disabled={isLoading}
                        />
                    </div>

                    <AuthRedirect
                        text="Вже маєте акаунт?"
                        linkText="Увійти"
                        to={AUTH.LOGIN}
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