import { useEffect, useState } from "react";

export const useActiveEntity = (user, serviceMethod) => {
    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntity = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const data = await serviceMethod(user.id);

                setEntity(data ?? null);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntity();
    }, [user?.id, serviceMethod]);

    return {
        entity,
        loading,
        error,
    }
}