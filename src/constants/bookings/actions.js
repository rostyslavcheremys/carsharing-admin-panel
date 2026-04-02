import { Visibility } from "../../libs/mui-icons";

import { ADMIN, BOOKING_ACTION_MESSAGES } from "../../constants";

export const BOOKING_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) =>
            navigate(ADMIN.bookingDetails(id)),
        confirmMessage: () =>
            BOOKING_ACTION_MESSAGES.VIEW_CONFIRM
    }
];