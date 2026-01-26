import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    const firebaseUser = userCredential.user;
    const uid = firebaseUser.uid;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        throw new Error("User profile not found");
    }

    return {
        uid,
        email: firebaseUser.email,
        ...userSnap.data(),
    };
};