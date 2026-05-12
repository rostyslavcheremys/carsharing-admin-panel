import { useCallback, useEffect, useState } from "react";

export const useEntity = (id, serviceMethod) => {
    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEntity = useCallback(async () => {
        if (!id) {
            setEntity(null);
            setError(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await serviceMethod(id);

            setEntity(data ?? null);
        } catch (err) {
            setError(err);
            setEntity(null);
        } finally {
            setLoading(false);
        }
    }, [id, serviceMethod]);

    useEffect(() => {
        fetchEntity();
    }, [fetchEntity]);

    return {
        entity,
        loading,
        error,
        refetch: fetchEntity,
    }
}