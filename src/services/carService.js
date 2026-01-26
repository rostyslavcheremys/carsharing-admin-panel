import imageCompression from "browser-image-compression";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, GeoPoint } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";

import { getNumberOrZero, getStringOrEmpty } from "../utils";

export const createCar = async (data) => {
    const newCarRef = doc(collection(db, "cars"));
    const newCarId = newCarRef.id;

    let imageUrls = [];

    if (data.images && data.images.length > 0) {
        const imagePromises = data.images.map(async (file, index) => {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: "image/webp"
            };

            const compressedFile = await imageCompression(file, options);
            const fileName = `image_${index + 1}.webp`;
            const storagePath = `cars/${newCarId}/${fileName}`;
            const storageRef = ref(storage, storagePath);
            const snapshot = await uploadBytes(storageRef, compressedFile);

            return await getDownloadURL(snapshot.ref);
        });

        imageUrls = await Promise.all(imagePromises);
    }

    const carData = {
        id: newCarId,
        brand: getStringOrEmpty(data.brand),
        model: getStringOrEmpty(data.model),
        carNumber: getStringOrEmpty(data.carNumber),
        status: getStringOrEmpty(data.status),
        transmissionType: getStringOrEmpty(data.transmissionType),
        powertrainType: getStringOrEmpty(data.powertrainType),
        bodyType: getStringOrEmpty(data.bodyType),
        driveType: getStringOrEmpty(data.driveType),
        color: getStringOrEmpty(data.color),

        year: getNumberOrZero(data.year),
        mileage: getNumberOrZero(data.mileage),
        pricePerDay: getNumberOrZero(data.pricePerDay),
        seats: getNumberOrZero(data.seats),
        rating: 0,

        engine: {
            fuelType: data.powertrainType === 'hybrid'
                ? getStringOrEmpty(data.fuelType)
                : getStringOrEmpty(data.powertrainType),
            displacement: getNumberOrZero(data.displacement)
        },

        battery: {
            capacity: getNumberOrZero(data.capacity),
            range: getNumberOrZero(data.range)
        },

        location: new GeoPoint(
            getNumberOrZero(data.latitude),
            getNumberOrZero(data.longitude)
        ),

        images: imageUrls,
    };

    await setDoc(newCarRef, carData);

    return carData;
};