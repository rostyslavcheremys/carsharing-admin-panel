import { httpsCallable } from "firebase/functions";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { functions, db } from "../firebase";

const deleteUserCallable = httpsCallable(functions, "deleteUser");

export class UserService {
    static async deleteUser(userId){
        const result = await deleteUserCallable({ userId });
        return result.data;
    }

    static async approveUser(userId) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            verificationStatus: "approved",
        });
    }

    static async getUser(id) {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        return {
            id: userSnap.id,
            ...userSnap.data()
        }
    }

    static async blockUser(userId, isBlocked) {
        const userRef = doc(db, "users", userId);

        await updateDoc(userRef, {
            isBlocked: !isBlocked,
        });
    }
}