export const formatDays = (days) => {
    if (days === 1) return "день";
    if (days >= 2 && days <= 4) return "дні";
    return "днів";
}