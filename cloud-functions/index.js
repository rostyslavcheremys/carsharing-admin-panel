import admin from "firebase-admin";
admin.initializeApp();

export { deleteUser } from "./auth/deleteUser.js";
export { cancelExpiredBookings } from "./bookings/cancelExpiredBookings.js";