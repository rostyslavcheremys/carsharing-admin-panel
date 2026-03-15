import { useMemo } from "react";

export const useTableColumns = (baseColumns, customRenderers = {}) => {
    return useMemo(() => {
        return baseColumns.map((column) => {
            if (customRenderers[column.id]) {
                return {
                    ...column,
                    render: customRenderers[column.id],
                };
            }

            return column;
        });
    }, [baseColumns, customRenderers]);
}