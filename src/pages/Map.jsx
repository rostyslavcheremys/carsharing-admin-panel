import { MapItem } from "../components";

export const Map = () => {
    const locations = [
        { lat: 49.4444, lng: 32.0598 },
        { lat: 49.45, lng: 32.06 },
        { lat: 49.44, lng: 32.05 },
    ];


    return (
        <div className="page">
            <span className="page__title">Моніторинг автомобілів</span>

            <div className="page__map">
                <MapItem
                    locations={locations}
                    className="map-item page"
                />
            </div>
        </div>
    );
};
