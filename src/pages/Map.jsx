import { MapItem } from "../components";

export const Map = () => {
    const location = { lat: 49.4444, lng: 32.0598 };

    return (
        <div className="map-page">
            <MapItem location={location} />
        </div>
    );
};
