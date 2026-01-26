import {
    useEffect,
    useState
} from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import { AuthContext } from "../../context";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            const userRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                ...userSnap.data(),
            });

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};