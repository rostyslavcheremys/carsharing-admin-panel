import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { Visibility } from "../../libs/mui-icons";

export const USER_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) => navigate(`/users/${id}`)
    },
    {
        type: "toggleBlock",
        handler: async ({ id, isBlocked }) => {
            await updateDoc(doc(db, "users", id), { isBlocked: !isBlocked });
        },
    },
];