export const USER = {
    HOME: "/",
    MAP: "/map",

    PROFILE: "/profile",
    PROFILE_DETAILS: "/profile/:id",
    PROFILE_EDIT: "/profile/:id/edit",
    profileDetails: (id) => `/profile/${id}`,
    profileEdit: (id) => `/profile/${id}/edit`,

    CAR_DETAILS: "/cars/:id",
    CAR_ACCESS: "/car-access",
    CAR_CONDITIONS_START: "/car-conditions/start",
    CAR_CONDITIONS_END: "/car-conditions/end",
    carDetails: (id) => `/cars/${id}`,

    BOOKING_PERIOD: "/booking/:id/date",
    BOOKING_PAYMENT: "/booking/:id/payment",
    BOOKING_CONFIRM: "/booking/:id/confirm",
    BOOKINGS_HISTORY: "/bookings/history",
    BOOKINGS_HISTORY_DETAILS: "/bookings/history/:id",
    bookingPeriod: (id) => `/booking/${id}/date`,
    bookingPayment: (id) => `/booking/${id}/payment`,
    bookingConfirm: (id) => `/booking/${id}/confirm`,
    bookingsHistoryDetails: (id) => `/bookings/history/${id}`,

    TRIP: "/trip",
    TRIP_SUMMARY: "/trip/summary",
    TRIPS_HISTORY: "/trips/history",
    TRIPS_HISTORY_DETAILS: "/trips/history/:id",
    tripsHistoryDetails: (id) => `/trips/history/${id}`,
}