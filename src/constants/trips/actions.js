import { DeleteIcon, Visibility } from "../../libs/mui-icons";

import { ADMIN, TRIP_ACTION_MESSAGES } from "../../constants";

export const TRIPS_ACTIONS = (onDelete, showMessage) => [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) =>
            navigate(ADMIN.tripDetails(id))
    },
    {
        type: "delete",
        Icon: DeleteIcon,
        handler: async ({ id }) => {
            try {
                await onDelete(id);
                showMessage(TRIP_ACTION_MESSAGES.DELETE_SUCCESS);
            } catch {
                showMessage(TRIP_ACTION_MESSAGES.DELETE_ERROR);
            }
        },
        confirmMessage: () =>
            TRIP_ACTION_MESSAGES.DELETE_CONFIRM
    }
];