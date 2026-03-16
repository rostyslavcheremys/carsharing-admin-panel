import { Visibility } from "../../libs/mui-icons";

export const TRIPS_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) => navigate(`/trips/${id}`)
    }
];