import { Visibility } from "../../libs/mui-icons";

export const BOOKING_ACTIONS = [
    {
        type: "view",
        Icon: Visibility,
        handler: ({ id, navigate }) => navigate(`/bookings/${id}`)
    }
];