export const CAR_ACTION_MESSAGES = {
    CREATE_SUCCESS: "Автомобіль додано!",

    EDIT_CONFIRM: "Редагувати автомобіль?",
    EDIT_SUCCESS: "Автомобіль оновлено!",

    DELETE_CONFIRM: "Видалити автомобіль?",
    DELETE_SUCCESS: "Автомобіль видалено!",
    DELETE_ERROR: "Не вдалося видалити автомобіль.",
}

export const USER_ACTION_MESSAGES = {
    DELETE_CONFIRM: "Видалити користувача?",
    DELETE_SUCCESS: "Користувача видалено!",
    DELETE_ERROR: "Не вдалося видалити користувача.",

    BLOCK_CONFIRM: (isBlocked) => isBlocked
        ? "Розблокувати користувача?"
        : "Заблокувати користувача?",
    BLOCK_ERROR: "Не вдалося змінити статус користувача."
}