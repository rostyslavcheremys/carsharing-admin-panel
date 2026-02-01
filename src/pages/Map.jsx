import { MapItem } from "../components";

export const Map = () => {
    const location = { lat: 49.4444, lng: 32.0598 };

    return (
        <div className="page">
            <span className="page__title">Моніторинг автомобілів</span>

            <div className="page__map">
                <MapItem
                    location={location}
                    className="map-item page"
                />
            </div>
        </div>
    );
};
