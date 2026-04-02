import { Visibility } from "../../libs/mui-icons";

import { ADMIN, TRIP_ACTION_MESSAGES } from "../../constants";

export const TRIPS_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) =>
            navigate(ADMIN.tripDetails(id)),
        confirmMessage: () =>
            TRIP_ACTION_MESSAGES.VIEW_CONFIRM
    }
];