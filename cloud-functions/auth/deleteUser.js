import { onCall } from "firebase-functions/v2/https";
import { db, auth } from "../firebaseAdmin.js";

export const deleteUser = onCall(async (request) => {
    const { userId } = request.data;

    if (!request.auth) throw new Error("unauthenticated");

    const adminDoc = await db.collection("users").doc(request.auth.uid).get();

    if (!adminDoc.exists || adminDoc.data().role !== "admin") {
        throw new Error("permission-denied");
    }

    await auth.deleteUser(userId);
    await db.collection("users").doc(userId).delete();

    return { success: true };
});