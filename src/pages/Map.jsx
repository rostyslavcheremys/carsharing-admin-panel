import { MonitoringMap } from "../components";

export const Map = () => {
    const location = { lat: 49.4444, lng: 32.0598 };

    return (
        <div className="map-page">
            <MonitoringMap location={location} />
        </div>
    );
};
