import { Visibility, EditIcon, DeleteIcon } from "../../libs/mui-icons";

export const CAR_ACTIONS = (onDelete) => [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) => navigate(`/cars/${id}`)
    },
    {
        type: "edit",
        Icon: EditIcon,
        handler: ({ id, navigate }) => navigate(`/cars/${id}/edit`)
    },
    {
        type: "delete",
        Icon: DeleteIcon,
        handler: ({ id }) => onDelete(id)
    }
];