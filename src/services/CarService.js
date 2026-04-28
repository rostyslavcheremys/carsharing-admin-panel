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

import { uploadImages, deleteImages, getCarObject } from "../utils";

export class CarService {
    static async create(data) {
        const newCarRef = doc(collection(db, "cars"));
        const newCarId = newCarRef.id;

        let imageUrls = [];

        if (data.images && data.images.length > 0) {
            const uploadResult = await uploadImages(data.images, "cars", newCarId);
            imageUrls = uploadResult.urls;
        }

        const carData = getCarObject(data, newCarId, imageUrls);
        await setDoc(newCarRef, carData);

        return carData;
    }

    static async update(carId, data, originalImages = []) {
        const currentImages = data.images || [];
        const retainedImages = currentImages.filter(img => typeof img === 'string');
        const newFiles = currentImages.filter(img => img instanceof File);
        const removedImages = originalImages.filter(url => !retainedImages.includes(url));

        if (removedImages.length > 0) await deleteImages(removedImages);

        let finalImages = [...retainedImages];

        if (newFiles.length > 0) {
            const uploadResult = await uploadImages(newFiles, "cars", carId);
            finalImages = [...finalImages, ...uploadResult.urls];
        }

        const carData = getCarObject(data, carId, finalImages);
        Object.keys(carData).forEach(key => carData[key] === undefined && delete carData[key]);

        const carRef = doc(db, "cars", carId);
        await updateDoc(carRef, carData);

        return carData;
    }

    static async delete(carId) {
        const carDocRef = doc(db, "cars", carId);
        await deleteDoc(carDocRef);

        const imagesRef = ref(storage, `cars/${carId}`);
        const fileList = await listAll(imagesRef);
        const deletePromises = fileList.items.map(fileRef => deleteObject(fileRef));

        await Promise.all(deletePromises);
    }

    static async getById(carId) {
        const carRef = doc(db, "cars", carId);
        const carSnap = await getDoc(carRef);

        if (!carSnap.exists()) return null;

        return {
            id: carSnap.id,
            ...carSnap.data(),
        }
    }

    static async toggleLock(carId, isLocked) {
        if (!carId) throw new Error("Автомобіль не знайдено!");

        const carRef = doc(db, "cars", carId);

        await updateDoc(carRef, { isLocked });
    }

    static async lock(carId) {
        return this.toggleLock(carId, true);
    }

    static async unlock(carId) {
        return this.toggleLock(carId, false);
    }
}