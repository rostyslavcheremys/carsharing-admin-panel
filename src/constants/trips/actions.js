import { Visibility } from "../../libs/mui-icons";

import { ADMIN } from "../../constants";

export const TRIPS_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) => navigate(ADMIN.tripDetails(id))
    }
];