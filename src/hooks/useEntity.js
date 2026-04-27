import { useEffect, useState } from "react";

export const useEntity = (id, serviceMethod) => {
    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchEntity = async () => {
            if (!id) {
                setEntity(null);
                setError(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const data = await serviceMethod(id);

                if (isMounted) {
                    setEntity(data ?? null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setEntity(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchEntity();

        return () => {
            isMounted = false;
        };
    }, [id, serviceMethod]);

    return {
        entity,
        loading,
        error,
    }
}