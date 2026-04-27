import { useAuth, useEntity } from "../hooks";

import { BookingService } from "../services";

export const useActiveBooking = () => {
    const { user } = useAuth();

    return useEntity(user?.id, BookingService.getActiveBookingByUser);
}