import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "firebase/firestore";

import { auth, db } from "../firebase";

import { assert } from "../utils";

export class AuthService {
    static async login(email, password) {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        assert(userSnap.exists(), "Користувача не знайдено!");

        return {
            uid: user.uid,
            email: user.email,
            ...userSnap.data(),
        }
    }

    static async register(data) {
        const {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            birthDate
        } = data;

        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", user.uid), {
            email,
            firstName,
            lastName,
            phoneNumber,
            role: "user",
            isBlocked: false,
            verificationStatus: "awaiting_verification",
            birthDate: birthDate.toDate(),
            createdAt: serverTimestamp(),
        });

        return {
            uid: user.uid,
            email: user.email
        }
    }
}