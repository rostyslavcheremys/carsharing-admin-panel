export const getActionMessage = (entity, action, id) => {
    const entities = {
        car: "автомобіль",
        user: "користувача",
        booking: "бронювання",
    };

    const actions = {
        view: "Переглянути",
        edit: "Редагувати",
        delete: "Видалити",
    };

    if (!entities[entity] || !actions[action]) return "";

    return `${actions[action]} ${entities[entity]}?\nID: ${id}`;
};