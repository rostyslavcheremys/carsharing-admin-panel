import { markerPicker } from "../../assets/icons";

export const getPickerMarkerIcon = () => {
    if (!window.google) return null;

    return {
        url: markerPicker,
        scaledSize: new window.google.maps.Size(48, 48),
        anchor: new window.google.maps.Point(24, 48),
    }
}