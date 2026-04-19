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
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const ref = useMemo(() => {
        return typeof refOrName === "string"
            ? collection(db, refOrName)
            : refOrName;
    }, [refOrName]);

    const mapSnapshot = (snapshot) =>
        snapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            .filter(Boolean);

    const fetch = useCallback(async () => {
        setIsLoading(true);
        try {
            const snapshot = await getDocs(ref);
            setData(mapSnapshot(snapshot));
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [ref]);

    useEffect(() => {
        if (!ref) return;

        if (!live) {
            fetch();
            return;
        }

        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                setData(mapSnapshot(snapshot));
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
};