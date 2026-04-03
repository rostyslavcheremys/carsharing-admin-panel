import { Visibility, EditIcon, DeleteIcon } from "../../libs/mui-icons";

import { ADMIN, CAR_ACTION_MESSAGES } from "../../constants";

export const CAR_ACTIONS = (onDelete, showMessage) => [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) =>
            navigate(ADMIN.carDetails(id))
    },
    {
        type: "edit",
        Icon: EditIcon,
        handler: ({ id, navigate }) =>
            navigate(ADMIN.carEdit(id)),
        confirmMessage: () =>
            CAR_ACTION_MESSAGES.EDIT_CONFIRM
    },
    {
        type: "delete",
        Icon: DeleteIcon,
        handler: async ({ id }) => {
            try {
                await onDelete(id);
                showMessage(CAR_ACTION_MESSAGES.DELETE_SUCCESS);
            } catch {
                showMessage(CAR_ACTION_MESSAGES.DELETE_ERROR);
            }
        },
        confirmMessage: () =>
            CAR_ACTION_MESSAGES.DELETE_CONFIRM
    }
];