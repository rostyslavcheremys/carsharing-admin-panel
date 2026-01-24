import { useEffect, useState, useCallback } from "react";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useCollection = (collectionName, { live = true } = {}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const snapshot = await getDocs(collection(db, collectionName));
            setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, [collectionName]);

    useEffect(() => {
        if (!live) {
            fetch();
            return;
        }

        const unsub = onSnapshot(
            collection(db, collectionName),
            (snapshot) => {
                setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setIsLoading(false);
            },
            (err) => {
                setError(err);
                setIsLoading(false);
            }
        );

        return () => unsub();
    }, [collectionName, live, fetch]);

    return { data, isLoading, error, refetch: fetch };
};
