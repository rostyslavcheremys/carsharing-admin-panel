import { onSchedule } from "firebase-functions/v2/scheduler";
import { db } from "../firebaseAdmin.js";

export const cancelExpiredBookings = onSchedule("every 1 minutes", async () => {
    const now = Date.now();

    const snapshot = await db.collection("bookings")
        .where("status", "in", ["awaiting_payment", "confirmed"])
        .get();

    const batch = db.batch();

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();

        const expiresAt = data.expiresAt?.toMillis() || 0;
        const plannedEnd = data.plannedEnd?.toMillis?.() || 0;

        if (data.status === "awaiting_payment" && expiresAt < now) {
            batch.update(docSnap.ref, {
                status: "cancelled",
            });
        }

        if (data.status === "confirmed" && plannedEnd < now) {
            batch.update(docSnap.ref, {
                status: "expired",
            });
        }
    });

    return batch.commit();
});