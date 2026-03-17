export const getActionMessage = (entity, action, id, isBlocked) => {
    const entities = {
        user: "користувача",
        car: "автомобіль",
        booking: "бронювання",
        trip: "поїздку",
    };

    const actions = {
        view: "Переглянути",
        edit: "Редагувати",
        delete: "Видалити",
        toggleBlock: isBlocked ? "Розблокувати" : "Заблокувати",
    };

    if (!entities[entity] || !actions[action]) return "";

    return `${actions[action]} ${entities[entity]}?\nID: ${id}`;
};