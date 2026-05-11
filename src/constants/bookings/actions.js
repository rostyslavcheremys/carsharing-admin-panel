import { DeleteIcon, Visibility } from "../../libs/mui-icons";

import { ADMIN, BOOKING_ACTION_MESSAGES, USER } from "../../constants";

export const BOOKING_ACTIONS = (onDelete, showMessage) => [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) =>
            navigate(ADMIN.bookingDetails(id)),
    },
    {
        type: "delete",
        Icon: DeleteIcon,
        handler: async ({ id }) => {
            try {
                await onDelete(id);
                showMessage(BOOKING_ACTION_MESSAGES.DELETE_SUCCESS);
            } catch {
                showMessage(BOOKING_ACTION_MESSAGES.DELETE_ERROR);
            }
        },
        confirmMessage: () =>
            BOOKING_ACTION_MESSAGES.DELETE_CONFIRM
    }
];

export const BOOKING_HISTORY_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) =>
            navigate(USER.bookingHistoryDetails(id)),
    }
];