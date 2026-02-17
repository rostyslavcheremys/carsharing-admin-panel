export const getCarActionsMessage = (action, id) => {
    switch (action) {
        case "view":
            return `Переглянути автомобіль?\nID: ${id}`;
        case "edit":
            return `Редагувати автомобіль?\nID: ${id}`;
        case "delete":
            return `Видалити автомобіль?\nID: ${id}`;
        default:
            return "";
    }
}