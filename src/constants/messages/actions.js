export const BOOKING_ACTION_MESSAGES = {
    VIEW_CONFIRM: "Переглянути бронювання?",
}

export const CAR_ACTION_MESSAGES = {
    VIEW_CONFIRM: "Переглянути автомобіль?",

    CREATE_SUCCESS: "Автомобіль додано!",

    EDIT_CONFIRM: "Редагувати автомобіль?",
    EDIT_SUCCESS: "Автомобіль оновлено!",

    DELETE_CONFIRM: "Видалити автомобіль?",
    DELETE_SUCCESS: "Автомобіль видалено!",
    DELETE_ERROR: "Не вдалося видалити автомобіль.",
}

export const CAR_CONDITION_ACTION_MESSAGES = {
    VIEW_CONFIRM: "Переглянути стан автомобіля?",
}

export const TRIP_ACTION_MESSAGES = {
    VIEW_CONFIRM: "Переглянути поїздку?",
}

export const USER_ACTION_MESSAGES = {
    VIEW_CONFIRM: "Переглянути користувача?",

    DELETE_CONFIRM: "Видалити користувача?",
    DELETE_SUCCESS: "Користувача видалено!",
    DELETE_ERROR: "Не вдалося видалити користувача.",

    BLOCK_CONFIRM: (isBlocked) => isBlocked
        ? "Розблокувати користувача?"
        : "Заблокувати користувача?",
    BLOCK_SUCCESS: (isBlocked) => isBlocked
        ? "Користувача розблоковано!"
        : "Користувача заблоковано!",
    BLOCK_ERROR: "Не вдалося змінити статус користувача."
}