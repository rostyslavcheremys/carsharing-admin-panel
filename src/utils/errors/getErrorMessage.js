export const getErrorMessage = (error) => {
    if (!error?.code) {
        return error?.message || "Сталася невідома помилка.";
    }

    switch (error.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
            return "Невірна електронна пошта або пароль.";

        case "auth/email-already-in-use":
            return "Ця пошта вже використовується іншим користувачем.";

        case "auth/weak-password":
            return "Пароль занадто слабкий (мінімум 6 символів).";

        case "auth/invalid-email":
            return "Невірний формат електронної пошти.";

        case "auth/user-disabled":
            return "Ваш обліковий запис заблоковано адміністратором.";

        case "auth/too-many-requests":
            return "Забагато невдалих спроб. Спробуйте пізніше.";

        case "auth/operation-not-allowed":
            return "Вхід цим способом наразі вимкнено.";

        case "permission-denied":
        case "storage/unauthorized":
            return "У вас немає прав для виконання цієї дії.";

        case "unauthenticated":
            return "Ваша сесія закінчилась. Будь ласка, увійдіть знову.";

        case "unavailable":
        case "auth/network-request-failed":
        case "storage/retry-limit-exceeded":
        case "deadline-exceeded":
            return "Проблеми з інтернетом. Перевірте з'єднання.";

        case "not-found":
        case "storage/object-not-found":
            return "Об'єкт не знайдено (можливо, він був видалений).";

        case "already-exists":
            return "Такий запис вже існує.";

        case "resource-exhausted":
        case "storage/quota-exceeded":
            return "Сервер перевантажений або закінчилось місце.";

        case "storage/server-file-wrong-size":
        case "storage/invalid-image":
        case "storage/invalid-checksum":
            return "Помилка файлу. Спробуйте завантажити інше фото.";

        case "invalid-argument":
            return "Некоректні дані. Перевірте правильність заповнення полів.";

        case "storage/canceled":
        case "cancelled":
        case "aborted":
            return "Дію скасовано.";

        default:
            console.error("Error:", error.code, error);
            return "Щось пішло не так. Спробуйте ще раз.";
    }
}