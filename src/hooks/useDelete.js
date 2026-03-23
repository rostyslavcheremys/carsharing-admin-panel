import { useState, useCallback } from "react";

import { getErrorMessage } from "../utils";

export const useDelete = (deleteFn, showMessage) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = useCallback(
        async (id, successMessage) => {
            try {
                setIsDeleting(true);
                await deleteFn(id);

                showMessage(successMessage);
            } catch (error) {
                showMessage(getErrorMessage(error));
            } finally {
                setIsDeleting(false);
            }
        },
        [deleteFn, showMessage]
    );

    return { isDeleting, handleDelete };
};