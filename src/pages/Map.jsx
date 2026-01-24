import { MonitoringMap } from "../components";

export const Map = () => {
    const center = { lat: 49.4444, lng: 32.0598 };

    return (
        <div className="map-page">
            <MonitoringMap center={center} />
        </div>
    );
};
