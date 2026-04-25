import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";

import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export class AuthService {
    static async login(email, password) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        const uid = firebaseUser.uid;

        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            throw new Error("Користувача не знайдено!");
        }

        return {
            uid,
            email: firebaseUser.email,
            ...userSnap.data(),
        };
    }

    static async register(data) {
        const { email, password, firstName, lastName, phoneNumber, birthDate } = data;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            email,
            firstName,
            lastName,
            phoneNumber,
            role: "user",
            isBlocked: false,
            verificationStatus: "pending",
            birthDate: birthDate.toDate(),
            createdAt: new Date(),
        });

        return user;
    }
}