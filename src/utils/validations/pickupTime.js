export const getPickupTimeValidation = (minDelayMinutes = 15, workHours = { start: 9, end: 20 }) => ({
    required: "Select pickup time",
    validate: (value) => {
        if (!value) return "Select pickup time";

        const now = new Date();
        const [hours, minutes] = value.split(":").map(Number);

        const selectedTime = new Date();
        selectedTime.setHours(hours, minutes, 0, 0);

        if (hours < workHours.start || hours >= workHours.end) {
            return `Pickup available from ${workHours.start}:00 to ${workHours.end}:00`;
        }

        const minAllowedTime = new Date(now.getTime() + minDelayMinutes * 60000);
        if (selectedTime < minAllowedTime) {
            return `Pickup time must be at least ${minDelayMinutes} minutes from now`;
        }

        return true;
    }
});