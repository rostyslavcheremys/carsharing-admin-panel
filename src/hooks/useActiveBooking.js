import { useEffect, useState } from "react";

import { useAuth } from "../hooks";

import { BookingService } from "../services";

export const useActiveBooking = () => {
    const { user } = useAuth();

    const [activeBooking, setActiveBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const booking = await BookingService.getActiveBookingByUser(user.id);

                setActiveBooking(booking ?? null);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [user?.id]);

    return {
        activeBooking,
        activeCarId: activeBooking?.carId ?? null,
        activeBookingId: activeBooking?.id ?? null,
        loading,
        error
    }
}