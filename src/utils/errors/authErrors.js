export const getAuthErrorMessage = (error) => {
    switch (error?.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
            return "Невірна електронна пошта або пароль";

        case "auth/invalid-email":
            return "Невірний формат електронної пошти";

        case "auth/user-disabled":
            return "Обліковий запис заблоковано!";

        case "auth/too-many-requests":
            return "Забагато спроб входу. Спробуйте пізніше";

        case "auth/network-request-failed":
            return "Проблеми з інтернет-з'єднанням";

        default:
            return "Помилка входу. Спробуйте ще раз";
    }
};