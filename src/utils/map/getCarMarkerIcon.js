import { markerPicker } from "../../assets/icons";

import { getIconUrl } from "../../utils";

export const getCarMarkerIcon = (status, isMine, isAdmin, size = 48) => {
    const url = getIconUrl(status, isMine, isAdmin) || markerPicker;

    return {
        url,
        scaledSize: new window.google.maps.Size(size, size),
        anchor: new window.google.maps.Point(size / 2, size / 2),
    }
}