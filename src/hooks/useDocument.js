import { useState, useEffect } from "react";

import { getErrorMessage, getDocumentById } from "../utils";

export const useDocument = (collection, id, showMessage, navigate) => {
    const [document, setDocument] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDocument = async () => {
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

        loadDocument();
    }, [id]);

    return {
        document,
        isLoading,
        error
    }
}