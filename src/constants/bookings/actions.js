import { Visibility } from "../../libs/mui-icons";

import { ADMIN } from "../../constants";

export const BOOKING_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) =>
            navigate(ADMIN.bookingDetails(id)),
    }
];