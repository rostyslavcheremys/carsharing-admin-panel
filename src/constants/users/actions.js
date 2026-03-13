import { Visibility } from "../../libs/mui-icons";

export const USER_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) => navigate(`/users/${id}`)
    }
];