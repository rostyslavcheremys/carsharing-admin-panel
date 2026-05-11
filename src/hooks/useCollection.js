import {
    useState,
    useEffect,
    useCallback,
    useMemo
} from "react";

import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where
} from "firebase/firestore";

import { db } from "../firebase";

export const useCollection = (
    collectionName,
    {
        live = true,
        where: whereClause = null,
    } = {}
) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const ref = useMemo(() => {
        if (!collectionName) return null;

        let baseRef = collection(db, collectionName);

        if (whereClause) {
            const [field, op, value] = whereClause;

            if (value === undefined || value === null) {
                return null;
            }

            baseRef = query(
                baseRef,
                where(field, op, value)
            );
        }

        return baseRef;
    }, [collectionName, JSON.stringify(whereClause)]);

    const mapSnapshot = (snapshot) =>
        snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

    const fetchData = useCallback(async () => {
        if (!ref) return;

        setIsLoading(true);

        try {
            const snapshot = await getDocs(ref);

            setData(mapSnapshot(snapshot));
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [ref]);

    useEffect(() => {
        if (!ref) return;

        if (!live) {
            fetchData();
            return;
        }

        const unsubscribe = onSnapshot(
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

        return () => unsubscribe();
    }, [ref, live, fetchData]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchData,
    }
}