import { Visibility, LockOpenIcon, DeleteIcon } from "../../libs/mui-icons";

import { UserService } from "../../services";

import { ADMIN, USER_ACTION_MESSAGES } from "../../constants";

export const USER_ACTIONS = (onDelete, showMessage) => [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) =>
            navigate(ADMIN.userDetails(id))
    },
    {
        type: "block",
        Icon: LockOpenIcon,
        isAllowed: (user, currentUser) =>
            user.id !== currentUser?.id && user.role !== "admin",
        handler: async ({ id, isBlocked }) => {
            try {
                await UserService.setBlocked(id, !isBlocked);
            } catch {
                showMessage(USER_ACTION_MESSAGES.BLOCK_ERROR);
            }
        },
        confirmMessage: ({ isBlocked }) =>
            USER_ACTION_MESSAGES.BLOCK_CONFIRM(isBlocked)
    },
    {
        type: "delete",
        Icon: DeleteIcon,
        isAllowed: (user, currentUser) =>
            user.id !== currentUser?.id && user.role !== "admin",
        handler: async ({ id }) => {
            try {
                await onDelete(id);
                showMessage(USER_ACTION_MESSAGES.DELETE_SUCCESS);
            } catch {
                showMessage(USER_ACTION_MESSAGES.DELETE_ERROR);
            }
        },
        confirmMessage: () =>
            USER_ACTION_MESSAGES.DELETE_CONFIRM
    }
];