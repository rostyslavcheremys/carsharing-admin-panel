import { useActiveBooking, useEntity } from "../hooks";

import { CarService } from "../services";

export const useBookingCar = () => {
    const {
        entity: booking,
        loading: bookingLoading,
        error: bookingError
    } = useActiveBooking();

    const {
        entity: car,
        loading: carLoading,
        error: carError,
    } = useEntity(booking?.carId, CarService.getCarById);

    return {
        entity: car,
        loading: bookingLoading || carLoading,
        error: bookingError || carError,
    }
}