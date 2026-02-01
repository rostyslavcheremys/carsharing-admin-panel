import { GeoPoint } from "firebase/firestore";

import { getNumber, getString } from "../../utils";

export const getCarObject = (data, id, imageUrls = []) => {
    const hasEngine = ["ice", "hybrid"].includes(data.powertrainType);
    const hasBattery = ["electric", "hybrid"].includes(data.powertrainType);

    return {
        ...(id && { id }),
        images: imageUrls,
        brand: getString(data.brand),
        model: getString(data.model),
        licensePlate: getString(data.licensePlate),
        status: getString(data.status),
        transmissionType: getString(data.transmissionType),
        powertrainType: getString(data.powertrainType),
        bodyType: getString(data.bodyType),
        driveType: getString(data.driveType),
        color: getString(data.color),
        year: getNumber(data.year),
        mileage: getNumber(data.mileage),
        pricePerDay: getNumber(data.pricePerDay),
        seats: getNumber(data.seats),
        engine: {
            fuelType: hasEngine ? getString(data.fuelType) : "",
            displacement: hasEngine ? getNumber(data.displacement) : ""
        },
        battery: {
            capacity: hasBattery ? getNumber(data.capacity) : "",
            range: hasBattery ? getNumber(data.range) : ""
        },
        location: new GeoPoint(
            getNumber(data.latitude),
            getNumber(data.longitude)
        ),
        rating: data.rating ?? 0
    }
}