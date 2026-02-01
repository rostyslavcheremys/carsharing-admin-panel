import { getString, getNumber } from "../../utils";

export const getCarValues = (car) => {
    return {
        images: car.images || [],
        brand: getString(car.brand),
        model: getString(car.model),
        licensePlate: getString(car.licensePlate),
        status: getString(car.status),
        transmissionType: getString(car.transmissionType),
        powertrainType: getString(car.powertrainType),
        bodyType: getString(car.bodyType),
        driveType: getString(car.driveType),
        color: getString(car.color),
        year: getNumber(car.year),
        mileage: getNumber(car.mileage),
        pricePerDay: getNumber(car.pricePerDay),
        seats: getNumber(car.seats),
        fuelType: getString(car.engine?.fuelType),
        displacement: getNumber(car.engine?.displacement),
        capacity: getNumber(car.battery?.capacity),
        range: getNumber(car.battery?.range),
        latitude: getNumber(car.location?._lat || car.location?.latitude),
        longitude: getNumber(car.location?._long || car.location?.longitude),
        rating: car.rating ?? 0
    }
}