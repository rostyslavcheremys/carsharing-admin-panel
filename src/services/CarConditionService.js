import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebase";

import { uploadImages } from "../utils";

import { CAR_CONDITION_FIELDS } from "../constants";

export class CarConditionService {
    static async save({ trip, data, type }) {
        const conditionRef = doc(collection(db, "carConditions"));

        const carRef = doc(db, "cars", trip.carId);
        const carSnap = await getDoc(carRef);

        if (!carSnap.exists()) {
            throw new Error("Автомобіль не знайдено!");
        }

        const car = carSnap.data();

        if (Number(data.mileage) < Number(car.mileage)) {
            throw new Error(
                "Вказаний пробіг не може бути меншим за поточний пробіг автомобіля!"
            );
        }

        let imageUrls = [];

        if (data.images?.length) {
            const result = await uploadImages(
                data.images,
                "carConditions",
                conditionRef.id
            );

            imageUrls = result.urls;
        }

        await setDoc(
            conditionRef,
            {
                carId: trip.carId,
                userId: trip.userId,
                tripId: trip.id,
                images: imageUrls,
                conditionType: type,
                description: data.description,
                mileage: data.mileage,
                energyLevel: {
                    fuelPercent: data.fuelPercent,
                    batteryPercent: data.batteryPercent,
                },
                createdAt: new Date()
            }
        );

        await updateDoc(
            doc(db, "trips", trip.id),
            { [CAR_CONDITION_FIELDS[type]]: conditionRef.id }
        );

        return conditionRef.id;
    }
}