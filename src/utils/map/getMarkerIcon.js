import { CAR_ICONS } from "../../constants";

export const getMarkerIcon = (status, size = 48) => ({
    url: CAR_ICONS[status],
    scaledSize: new window.google.maps.Size(size, size),
    anchor: new window.google.maps.Point(size / 2, size / 2),
});