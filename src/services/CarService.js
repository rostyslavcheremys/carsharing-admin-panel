import {
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
} from "firebase/firestore";

import { ref, deleteObject, listAll } from "firebase/storage";

import { db, storage } from "../firebase";

import {
    uploadImages,
    deleteImages,
    getCarObject,
    assert
} from "../utils";

export class CarService {
    static async create(data) {
        assert(data, "Даних автомобіля не знайдено!");

        const newCarRef = doc(collection(db, "cars"));
        const newCarId = newCarRef.id;

        const imageUrls = data.images?.length
            ? (await uploadImages(data.images, "cars", newCarId)).urls
            : [];

        const carData = {
            ...getCarObject(data, newCarId, imageUrls),
            averageRating: 0,
            ratingCount: 0,
        }

        await setDoc(newCarRef, carData);

        return {
            id: newCarId,
            ...carData
        }
    }

    static async update(carId, data, originalImages = []) {
        assert(carId, "Автомобіль не знайдено!");

        const currentImages = data.images || [];

        const retainedImages = currentImages.filter(img => typeof img === "string");
        const newFiles = currentImages.filter(img => img instanceof File);

        const removedImages = originalImages.filter(url => !retainedImages.includes(url));

        if (removedImages.length) await deleteImages(removedImages);

        let finalImages = [...retainedImages];

        if (newFiles.length) {
            const uploadResult = await uploadImages(newFiles, "cars", carId);
            finalImages = [...finalImages, ...uploadResult.urls];
        }

        const carData = getCarObject(data, carId, finalImages);

        const cleanCarData = Object.fromEntries(
            Object.entries(carData).filter(([, v]) => v !== undefined)
        );

        const carRef = doc(db, "cars", carId);
        await updateDoc(carRef, cleanCarData);

        return {
            id: carId,
            ...cleanCarData
        }
    }

    static async delete(carId) {
        assert(carId, "Автомобіль не знайдено!");

        const carDocRef = doc(db, "cars", carId);
        const carSnap = await getDoc(carDocRef);

        assert(carSnap.exists(), "Автомобіль не знайдено!");

        const imagesRef = ref(storage, `cars/${carId}`);
        const fileList = await listAll(imagesRef);

        await Promise.all(fileList.items.map(fileRef => deleteObject(fileRef)));

        await deleteDoc(carDocRef);
    }

    static async getCarById(carId) {
        const carRef = doc(db, "cars", carId);
        const carSnap = await getDoc(carRef);

        assert(carSnap.exists(), "Автомобіль не знайдено!");

        return {
            id: carSnap.id,
            ...carSnap.data(),
        }
    }

    static async toggleLock(carId, isLocked) {
        const carRef = doc(db, "cars", carId);
        const carSnap = await getDoc(carRef);

        assert(carSnap.exists(), "Автомобіль не знайдено!");

        await updateDoc(carRef, { isLocked });
    }

    static async lock(carId) {
        return this.toggleLock(carId, true);
    }

    static async unlock(carId) {
        return this.toggleLock(carId, false);
    }
}