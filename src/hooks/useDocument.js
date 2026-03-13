import { useState, useEffect } from "react";

import { getDocumentById } from "../services";
import { getErrorMessage } from "../utils";

export const useDocument = (collection, id, showMessage, navigate) => {
    const [document, setDocument] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCar = async () => {
            if (!id) return;

            try {
                setIsLoading(true);

                const data = await getDocumentById(collection, id);

                setDocument(data);
            } catch (error) {
                setError(error);
                showMessage(
                    getErrorMessage(error),
                    () => navigate(collection)
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadCar();
    }, [id]);

    return {
        document,
        isLoading,
        error
    }
}