export const getFullName = (user) => {
    if (!user) return "—";
    return `${user.firstName} ${user.lastName}`;
}