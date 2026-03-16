import { MapPicker } from "../../components";

export const DetailsMap = ({ label, location, status }) => {
    if (!location) return null;

    return (
        <div className="map-details__container">
            <span className="page__label">{label}</span>
            <div className="map-details">
                <MapPicker
                    className="map map-details__picker"
                    location={location}
                    status={status}
                />
            </div>
        </div>
    );
};