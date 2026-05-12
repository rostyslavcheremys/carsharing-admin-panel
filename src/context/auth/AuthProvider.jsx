import { useEffect, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebase";

import { AuthContext } from "../../context";

import { assert } from "../../utils";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        return onAuthStateChanged(auth, async (firebaseUser) => {
            setError(null);

            if (!firebaseUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const userRef = doc(db, "users", firebaseUser.uid);
                const userSnap = await getDoc(userRef);

                assert(userSnap.exists(), "Користувача не знайдено!");

                setUser({
                    id: firebaseUser.uid,
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
    }, []);

    const logout = async () => {
        try {
            setLoading(true);

            await signOut(auth);

            setUser(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, error, logout }}>
            {children}
        </AuthContext.Provider>
    );
}