import { useState, useEffect } from "react";

import { getDocumentById } from "../utils";

export const useDocument = (collection, id) => {
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
            } finally {
                setIsLoading(false);
            }
        };

        loadDocument();
    }, [id]);

    return { document, isLoading, error }
}