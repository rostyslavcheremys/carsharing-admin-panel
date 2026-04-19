import { onSchedule } from "firebase-functions/v2/scheduler";
import { db } from "../firebaseAdmin.js";

export const cancelExpiredBookings = onSchedule("every 1 minutes", async () => {
    const now = Date.now();

    const snapshot = await db.collection("bookings")
        .where("status", "==", "pending")
        .get();

    const batch = db.batch();

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const expiresAt = data.expiresAt?.toMillis() || 0;

        if (expiresAt < now) {
            batch.update(docSnap.ref, {
                status: "cancelled",
            });
        }
    });

    return batch.commit();
});