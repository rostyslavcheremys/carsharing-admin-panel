import { Visibility, EditIcon, DeleteIcon } from "../../libs/mui-icons";

import { ADMIN } from "../../constants";

export const CAR_ACTIONS = (onDelete) => [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) => navigate(ADMIN.carDetails(id))
    },
    {
        type: "edit",
        Icon: EditIcon,
        handler: ({ id, navigate }) => navigate(ADMIN.carEdit(id))
    },
    {
        type: "delete",
        Icon: DeleteIcon,
        handler: ({ id }) => onDelete(id)
    }
];