export const ADMIN = {
    DASHBOARD: "/admin/dashboard",
    MONITORING: "/admin/monitoring",

    CARS: "/admin/cars",
    CAR_CREATE: "/admin/cars/add",
    CAR_DETAILS: "/admin/cars/:id",
    CAR_EDIT: "/admin/cars/:id/edit",
    CAR_CONDITION_DETAILS: "/admin/car-conditions/:id",
    carDetails: (id) => `/admin/cars/${id}`,
    carEdit: (id) => `/admin/cars/${id}/edit`,
    carConditionDetails: (id) => `/admin/car-conditions/${id}`,

    USERS: "/admin/users",
    USER_DETAILS: "/admin/users/:id",
    userDetails: (id) => `/admin/users/${id}`,

    BOOKINGS: "/admin/bookings",
    BOOKING_DETAILS: "/admin/bookings/:id",
    bookingDetails: (id) => `/admin/bookings/${id}`,

    TRIPS: "/admin/trips",
    TRIP_DETAILS: "/admin/trips/:id",
    tripDetails: (id) => `/admin/trips/${id}`,
}