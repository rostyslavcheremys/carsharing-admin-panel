import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

import { uploadImages, assert } from "../utils";

import { CAR_CONDITION_FIELDS } from "../constants";

export class CarConditionService {
    static async save({ trip, data, type }) {
        const conditionRef = doc(collection(db, "carConditions"));

        const carRef = doc(db, "cars", trip.carId);
        const carSnap = await getDoc(carRef);

        assert(carSnap.exists(), "Автомобіль не знайдено!");

        const car = carSnap.data();

        const newMileage = Number(data.mileage);
        const currentMileage = Number(car.mileage);

        assert(newMileage >= currentMileage, "Вказаний пробіг не може бути меншим!");

        const imageUrls = data.images?.length
            ? (await uploadImages(data.images, "carConditions", conditionRef.id)).urls
            : [];

        await setDoc(conditionRef, {
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
                createdAt: serverTimestamp()
            }
        );

        await updateDoc(doc(db, "trips", trip.id), {
            [CAR_CONDITION_FIELDS[type]]: conditionRef.id
        });

        return conditionRef.id;
    }
}