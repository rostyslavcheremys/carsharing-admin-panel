import { onCall } from "firebase-functions/v2/https";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

export const deleteUser = onCall(
    async (request) => {
        const { userId } = request.data;

        if (!request.auth) throw new Error("unauthenticated");

        const adminDoc = await db.collection("users").doc(request.auth.uid).get();

        if (!adminDoc.exists || adminDoc.data().role !== "admin") {
            throw new Error("permission-denied");
        }

        if (!userId) throw new Error("missing-userId");

        await auth.deleteUser(userId);
        await db.collection("users").doc(userId).delete();

        return { success: true, message: "Користувача успішно видалено" };
    }
);