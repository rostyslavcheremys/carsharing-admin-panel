import { Card, IconButton } from "../../libs/mui";

import { CloseIcon } from "../../libs/mui-icons";

import { getLabel } from "../../utils";

import { STATUS } from "../../constants";

export const MapCard = ({ car, onClose }) => {
    if (!car) return null;

    return (
        <Card className="map-card">
            <div className="map-card__content">
                <span className="map-card__text bold">{car.brand} {car.model}</span>
                <span className="map-card__text">{car.licensePlate}</span>
                <span className="map-card__text">
                    Статус: <span className={`map-card__text--status status--${car.status}`}>{getLabel(car.status, STATUS)}</span>
                </span>
            </div>


            <div className="map-card__icon">
                <IconButton onClick={onClose}>
                    <CloseIcon className="map-card__icon--close"/>
                </IconButton>
            </div>
        </Card>
    );
};
