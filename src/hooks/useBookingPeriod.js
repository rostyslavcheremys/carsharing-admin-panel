import { useMemo } from "react";

import { calculateBookingDays } from "../utils";

import { ACTIVE_BOOKING_STATUS } from "../constants";

export const useBookingPeriod = (
    bookings,
    carId,
    plannedStart,
    plannedEnd,
    pricePerDay
) => {
    const carBookings = useMemo(() => {
        if (!bookings) return [];

        return bookings.filter(
            b => b.carId === carId && ACTIVE_BOOKING_STATUS.includes(b.status)
        );
    }, [bookings, carId]);

    const disabledRanges = useMemo(() => {
        return carBookings.map(b => ({
            start: b.plannedStart.toDate(),
            end: b.plannedEnd.toDate(),
        }));
    }, [carBookings]);

    const days = useMemo(() => {
        if (!plannedStart || !plannedEnd) return 0;

        return calculateBookingDays(plannedStart, plannedEnd);
    }, [plannedStart, plannedEnd]);

    const totalPrice = useMemo(() => {
        if (!days || !pricePerDay) return 0;

        return days * pricePerDay;
    }, [days, pricePerDay]);

    return {
        carBookings,
        disabledRanges,
        days,
        totalPrice,
    }
}