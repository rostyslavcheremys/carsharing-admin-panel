import { httpsCallable } from "firebase/functions";

import { doc, updateDoc, getDoc } from "firebase/firestore";

import { functions, db } from "../firebase";

import { assert } from "../utils";

const deleteUserCallable = httpsCallable(functions, "deleteUser");

export class UserService {
    static async approve(userId) {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        assert(userSnap.exists(), "Користувача не знайдено!");

        await updateDoc(userRef, {
            verificationStatus: "approved",
        });
    }

    static async getUserById(id) {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        assert(userSnap.exists(), "Користувача не знайдено!");

        return {
            id: userSnap.id,
            ...userSnap.data()
        }
    }

    static async setBlocked(userId, isBlocked) {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        assert(userSnap.exists(), "Користувача не знайдено!");

        await updateDoc(userRef, { isBlocked });
    }

    static async delete(userId) {
        return deleteUserCallable({ userId });
    }
}