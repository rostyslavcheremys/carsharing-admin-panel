import { carGreen, carBlue } from "../../assets/icons";

import { CAR_ICONS } from "../../constants";

export const getIconUrl = (status, isMine, isAdmin) => {
    if (isMine) return carGreen;

    if (isAdmin) return CAR_ICONS[status];

    if (status === "rented") return carBlue;

    return CAR_ICONS[status];
}