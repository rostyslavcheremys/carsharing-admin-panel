import {
    useState,
    useMemo,
    useCallback,
    useEffect
} from "react";

import {
    collection,
    getDocs,
    onSnapshot
} from "firebase/firestore";

import { db } from "../firebase";

export const useCollection = (refOrName, { live = true } = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const ref = useMemo(() => {
        return typeof refOrName === "string"
            ? collection(db, refOrName)
            : refOrName;
    }, [refOrName]);

    const fetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const snapshot = await getDocs(ref);

            setData(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [ref]);

    useEffect(() => {
        if (!live) {
            fetch();
            return;
        }

        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                setData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })));
                setIsLoading(false);
            },
            (err) => {
                setError(err);
                setIsLoading(false);
            }
        );

        return () => unsub();
    }, [ref, live, fetch]);

    return { data, isLoading, error, refetch: fetch };
}