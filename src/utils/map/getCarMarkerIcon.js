import markerPicker from "../../assets/icons/marker-picker.svg";
import carGreen from "../../assets/icons/car-green.svg";

import { CAR_ICONS } from "../../constants";

export const getCarMarkerIcon = (status, isMine = false, size = 48) => {
    const url = isMine
        ? carGreen
        : CAR_ICONS[status] || markerPicker;

    return {
        url,
        scaledSize: new window.google.maps.Size(size, size),
        anchor: new window.google.maps.Point(size / 2, size / 2),
    };
};