import { useState } from "react";
import { useForm } from "react-hook-form";

import dayjs from "dayjs";

import {
    Loader,
    InputController,
    DatePickerController,
    AppButton,
    AuthRedirect,
    MessageDialog,
} from "../../components";

import { useMessageDialog } from "../../hooks";

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

import { AuthService } from "../../services";

export const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: dayjs("2000-01-01"),
            email: "",
            password: "",
            confirmPassword: "",
        },
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

                    <InputController
                        control={control}
                        name="firstName"
                        label="Ім'я*"
                        rules={getFirstNameValidation()}
                    />

                    <InputController
                        control={control}
                        name="lastName"
                        label="Прізвище*"
                        rules={getLastNameValidation()}
                    />

                    <InputController
                        control={control}
                        name="phoneNumber"
                        label="Номер телефону*"
                        rules={getPhoneNumberValidation()}
                    />

                    <DatePickerController
                        control={control}
                        name="birthDate"
                        label="Дата народження*"
                        rules={getBirthDateValidation()}
                    />

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

                    <InputController
                        control={control}
                        name="confirmPassword"
                        label="Підтвердження пароля*"
                        type="password"
                        rules={getConfirmPasswordValidation(() => watch("password"))}
                    />

                    <div className="page__buttons">
                        <AppButton
                            type="submit"
                            className="app-button--wide"
                            label="Зареєструватися"
                            disabled={isLoading}
                        />
                    </div>

                    <AuthRedirect
                        text="Вже маєте акаунт?"
                        linkText="Увійти"
                        to="/auth/login"
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
};
