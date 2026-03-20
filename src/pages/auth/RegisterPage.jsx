import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
    Loader,
    InputController,
    DatePickerController,
    AppButton,
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

    const navigate = useNavigate();

    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await AuthService.login(data.email, data.password);

            navigate("/", { replace: true });
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
