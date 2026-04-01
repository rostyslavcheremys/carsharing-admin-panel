export const USER = {
    HOME: "/",
    SUPPORT: "/support",

    PROFILE: "/profile",
    PROFILE_EDIT: "/profile/edit",

    CARS_MAP: "/cars/map",
    CAR_DETAILS: "/cars/:id",
    CAR_ACCESS: "/car-access",
    CAR_CONDITIONS_START: "/car-conditions/start",
    CAR_CONDITIONS_END: "/car-conditions/end",
    carDetails: (id) => `/cars/${id}`,

    BOOKING_DATE: "/booking/date",
    BOOKING_PAYMENT: "/booking/payment",
    BOOKING_CONFIRM: "/booking/confirm",
    BOOKINGS_HISTORY: "/bookings/history",
    BOOKINGS_HISTORY_DETAILS: "/bookings/history/:id",
    bookingsHistoryDetails: (id) => `/bookings/history/${id}`,

    TRIP: "/trip",
    TRIP_SUMMARY: "/trip/summary",
    TRIPS_HISTORY: "/trips/history",
    TRIPS_HISTORY_DETAILS: "/trips/history/:id",
    tripsHistoryDetails: (id) => `/trips/history/${id}`,
}