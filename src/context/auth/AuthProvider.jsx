import { useState, useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebase";

import { AuthContext } from "../../context";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);
            setError(null);

            if (!firebaseUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const userRef = doc(db, "users", firebaseUser.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) setError(error);

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    ...userSnap.data(),
                });
            } catch (error) {
                setError(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, error, logout }}>
            {children}
        </AuthContext.Provider>
    );
}