import dayjs from "dayjs";

export const LOGIN_FORM_DEFAULT_VALUES = {
    email: "",
    password: "",
}

export const REGISTER_FORM_DEFAULT_VALUES = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: dayjs("2000-01-01"),
    email: "",
    password: "",
    confirmPassword: "",
}