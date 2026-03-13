import {
    NearMeIcon,
    DirectionsCarIcon,
    PeopleIcon,
    EventNoteIcon,
    RoomIcon
} from "../../libs/mui-icons";

export const HEADER__BUTTONS = [
    {
        to: "/monitoring",
        Icon: NearMeIcon,
        tooltip: "Моніторинг автомобілів",
        iconClassName: "header__nav-icon"
    },
    {
        to: "/cars",
        Icon: DirectionsCarIcon,
        tooltip: "Керування автомобілями",
        iconClassName: "header__nav-icon header__nav-icon--cars"
    },
    {
        to: "/users",
        Icon: PeopleIcon,
        tooltip: "Керування користувачами",
        iconClassName: "header__nav-icon header__nav-icon--users"
    },
    {
        to: "/bookings",
        Icon: EventNoteIcon,
        tooltip: "Керування бронюваннями",
        iconClassName: "header__nav-icon"
    },
    {
        to: "/trips",
        Icon: RoomIcon,
        tooltip: "Керування поїздками",
        iconClassName: "header__nav-icon"
    }
];