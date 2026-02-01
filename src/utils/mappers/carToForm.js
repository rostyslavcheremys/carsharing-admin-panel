import { getString } from "../../utils";

export const carToForm = (car) => {
    return {
        brand: getString(car.brand),
        model: getString(car.model),
        licensePlate: getString(car.licensePlate),
        status: getString(car.status),
        transmissionType: getString(car.transmissionType),
        powertrainType: getString(car.powertrainType),
        bodyType: getString(car.bodyType),
        driveType: getString(car.driveType),
        color: getString(car.color),

        year: car.year || "",
        mileage: car.mileage || "",
        pricePerDay: car.pricePerDay || "",
        seats: car.seats || "",

        fuelType: getString(car.engine?.fuelType),
        displacement: car.engine?.displacement || "",

        capacity: car.battery?.capacity || "",
        range: car.battery?.range || "",

        latitude: car.location?._lat || car.location?.latitude || "",
        longitude: car.location?._long || car.location?.longitude || "",

        images: car.images || []
    }
}