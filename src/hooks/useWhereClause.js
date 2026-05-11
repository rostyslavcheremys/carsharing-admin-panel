import { useMemo } from "react";

export const useWhereClause = (field, value, operator = "==") => {
    return useMemo(() => {
        if (!value) return null;

        return [field, operator, value];
    }, [field, operator, value]);
}