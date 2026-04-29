export const CAR_ACTION_MESSAGES = {
    CREATE_SUCCESS: "Автомобіль додано!",

    EDIT_CONFIRM: "Редагувати автомобіль?",
    EDIT_SUCCESS: "Автомобіль оновлено!",

    DELETE_CONFIRM: "Видалити автомобіль?",
    DELETE_SUCCESS: "Автомобіль видалено!",
    DELETE_ERROR: "Не вдалося видалити автомобіль.",
}

export const CAR_CONDITION_ACTION_MESSAGES = {
    CREATE_SUCCESS: "Фотофіксацію стану автомобіля збережено!",
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

export const BOOKING_ACTION_MESSAGES = {
    DELETE_CONFIRM: "Видалити бронювання?",
    DELETE_SUCCESS: "Бронювання видалено!",
    DELETE_ERROR: "Не вдалося видалити бронювання.",
}

export const TRIP_ACTION_MESSAGES = {
    DELETE_CONFIRM: "Видалити поїздку?",
    DELETE_SUCCESS: "Поїздку видалено!",
    DELETE_ERROR: "Не вдалося видалити поїздку.",
}