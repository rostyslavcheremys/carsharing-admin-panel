export const calculateBookingDays = (start, end) => {
    if (!start || !end) return 0;

    const startDate = new Date(start);

    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;

    const diff = new Date(end).getTime() - new Date(start).getTime();

    if (diff <= 0) return 0;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}