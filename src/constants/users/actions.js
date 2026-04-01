import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { Visibility, LockOpenIcon, DeleteIcon } from "../../libs/mui-icons";

import { ADMIN } from "../../constants";

export const USER_ACTIONS = (onDelete) => [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) => navigate(ADMIN.userDetails(id)),
    },
    {
        type: "toggleBlock",
        Icon: LockOpenIcon,
        isAllowed: (user, currentUser) => user.id !== currentUser.id && user.role !== "admin",
        handler: async ({ id, isBlocked }) => {
            await updateDoc(doc(db, "users", id), {
                isBlocked: !isBlocked,
            });
        }
    },
    {
        type: "delete",
        Icon: DeleteIcon,
        handler: ({ id }) => onDelete(id)
    }
];