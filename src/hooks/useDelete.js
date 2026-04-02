import { useState, useCallback } from "react";

export const useDelete = (deleteFn) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = useCallback(
        async (id) => {
            setIsDeleting(true);
            try {
                await deleteFn(id);
            } finally {
                setIsDeleting(false);
            }
        },
        [deleteFn]
    );

    return { isDeleting, handleDelete };
}