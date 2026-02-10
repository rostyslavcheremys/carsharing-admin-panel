export const getPickerMarkerIcon = () => {
    if (!window.google) return null;

    return {
        url: "/src/assets/marker-picker.svg",
        scaledSize: new window.google.maps.Size(48, 48),
        anchor: new window.google.maps.Point(24, 48),
    };
}