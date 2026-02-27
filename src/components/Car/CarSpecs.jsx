import { getLabel } from "../../utils";

import { CarItem } from "../../components";

import {
    BODY_TYPES,
    COLORS,
    DRIVE_TYPES,
    FUEL_TYPES,
    POWERTRAIN_TYPES,
    STATUS,
    TRANSMISSION_TYPES,
} from "../../constants";

export const CarSpecs = ({ car }) => {
    return(
        <div className="car-specs">
            <CarItem label="Марка:" value={car.brand}/>
            <CarItem label="Модель:" value={car.model}/>
            <CarItem label="Рік:" value={car.year}/>
            <CarItem label="Пробіг:" value={`${car.mileage} км`}/>
            <CarItem label="Номерний знак:" value={car.licensePlate}/>
            <CarItem label="Тип кузова:" value={getLabel(car.bodyType, BODY_TYPES)}/>
            <CarItem label="Тип силової установки:" value={getLabel(car.powertrainType, POWERTRAIN_TYPES)}/>

            {car.engine.fuelType && (
                <CarItem label="Тип палива:" value={getLabel(car.engine.fuelType, FUEL_TYPES)}/>
            )}

            {car.engine.displacement && (
                <CarItem label="Об'єм двигуна:" value={`${car.engine.displacement} л`}/>
            )}

            {car.battery.capacity && (
                <CarItem label="Ємність батареї:" value={`${car.battery.capacity} кВт·год`}/>
            )}

            {car.battery.range && (
                <CarItem label="Запас ходу:" value={`${car.battery.range} км`}/>
            )}

            <CarItem label="Тип трансмісії:" value={getLabel(car.transmissionType, TRANSMISSION_TYPES)}/>
            <CarItem label="Тип приводу:" value={getLabel(car.driveType, DRIVE_TYPES)}/>
            <CarItem label="Колір:" value={getLabel(car.color, COLORS)}/>
            <CarItem label="Кількість місць:" value={car.seats}/>
            <CarItem label="Рейтинг:" value={car.rating}/>
            <CarItem label="Вартість за добу:" value={`${car.pricePerDay} грн`}/>
            <CarItem label="Статус:" value={getLabel(car.status, STATUS)}/>
        </div>
    );
}